/**
 *
 * NotificationDetail
 *
 */
import { FesTypography } from 'app/components/FesTypography/Loadable';
import { FesErrorMessage } from 'app/components/Forms';
import { ListComment } from 'app/pages/Notifications/screens';
import { validateNotification } from 'app/pages/Notifications/validation';
import { useNotificationSlice } from 'app/pages/Notifications/slice';
import {
  selectCommentNotification,
  selectNotificationDetail,
  selectLoading,
} from 'app/pages/Notifications/slice/selectors';
import { selectMe } from 'app/pages/Authorize/slice/selectors';
import { Form, Formik } from 'formik';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Label,
  Row,
} from 'reactstrap';
import styled from 'styled-components/macro';
import { defaultPaginate } from 'app/config/filter';
import { FesPaging } from 'app/components/FesPaging/Loadable';
import { UploadImage } from 'app/components/UploadImage/Loadable';
import { FesLoading } from 'app/components/FesLoading/Loadable';
import { fileType, getFileType } from 'app/constants';
import { toast } from 'react-toastify';
import { upLoadImg } from 'services/adminService';
import _ from 'lodash';

interface Props {}
interface ParamTypes {
  id: string;
}

export const AddEditNotification = memo((props: Props) => {
  const { t } = useTranslation();
  const [comment, setComment] = useState({});
  const [filter, setFilter] = useState(defaultPaginate);
  const [notificationFile, setNotificationFile] = useState({
    url: '',
    file: '',
    id: '',
  });
  const inputRefLogo = React.useRef<HTMLInputElement>(null);

  const history = useHistory();
  const { id } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const { actions } = useNotificationSlice();
  const listComment = useSelector(selectCommentNotification);
  const detailData = useSelector(selectNotificationDetail);
  const profile = useSelector(selectMe);
  const loading = useSelector(selectLoading);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    if (history.location.pathname !== '/notification-system/add') {
      dispatch(actions.detailNotification(id));
      dispatch(actions.getListComment({ id, filter }));
    } else {
      dispatch(actions.clearDataDetail({}));
      dispatch(actions.clearDataComment({}));
    }
  }, [actions, dispatch, filter, history, id]);

  useEffect(() => {
    setNotificationFile({
      file: '',
      id: detailData._id,
      url: detailData.image ? detailData.image : '',
    });
  }, [detailData]);

  const onHandleComment = useCallback(
    (event, index) => {
      if (event.key === 'Enter') {
        const { value } = event.target;
        const data = {
          content: value,
          notificationId: id,
          commentId: listComment.results[index]
            ? listComment.results[index]._id
            : '',
        };
        dispatch(actions.replyComment({ data, filter }));
        const comments = Object.assign({}, comment);
        comments[index] = '';
        setComment(comments);
      }
    },
    [actions, comment, dispatch, filter, id, listComment.results],
  );

  const onChangeValue = useCallback(
    (event, index) => {
      const { value } = event.target;
      const comments = Object.assign({}, comment);
      comments[index] = value;
      setComment(comments);
    },
    [comment],
  );

  const onDeleteComment = useCallback(
    (e, index) => {
      const commentId = listComment.results[index]._id;
      dispatch(actions.deleteComment({ commentId, id }));
    },
    [actions, dispatch, id, listComment.results],
  );

  const onDeleteReplyAdmin = useCallback(
    (e, index, positonReply) => {
      e.preventDefault();
      const idParent = listComment.results[index]._id;
      const commentId = _.get(
        listComment.results[index],
        `replies.${positonReply}._id`,
      );
      dispatch(actions.deleteReply({ commentId, id, idParent }));
    },
    [actions, dispatch, id, listComment],
  );

  const handlePageChange = useCallback(
    pageNumber => {
      setFilter({
        ...filter,
        page: pageNumber,
      });
    },
    [filter],
  );

  const onChangeFile = useCallback(async e => {
    setLoadingImage(true);
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    e.target.value = null;

    if (file) {
      const fileSize = file.size / (1024 * 1024);
      if (fileSize > 3) {
        return toast.error('업로드 파일이 3 MB에 초과하면 안 됩니다');
      }
      if (!fileType.includes(getFileType(file.name))) {
        return toast.error('업로드 실패하였습니다');
      }

      formData.append('image', file);
      const res = await upLoadImg(formData);
      if (!res) return toast.error('업로드 실패하였습니다');
      setNotificationFile({
        url: res.data.imageLink,
        file: file,
        id: res.data._id,
      });
      setLoadingImage(false);
    }
  }, []);

  const onReset = useCallback(() => {
    setNotificationFile({
      url: '',
      file: '',
      id: '',
    });
  }, []);

  const onSaveNotification = useCallback(
    values => {
      const data = {
        ...values,
        name: '러브홀림픽',
        image: notificationFile.url,
      };
      if (!detailData._id) {
        if (!notificationFile.id)
          return toast.error('이미지를 업로드해주세요.');
        dispatch(actions.postNotification(data));
        setNotificationFile({
          url: '',
          file: '',
          id: '',
        });
        history.go(-1);
      } else {
        if (!notificationFile.id)
          return toast.error('이미지를 업로드해주세요.');
        const _id = detailData._id;
        dispatch(actions.editNotification({ _id, data }));
        history.go(-1);
      }
    },
    [
      actions,
      detailData._id,
      dispatch,
      history,
      notificationFile.id,
      notificationFile.url,
    ],
  );

  return (
    <>
      {loading && <FesLoading />}
      <Div>
        <Title>{t('공지사항 등록')}</Title>
        <Row>
          <Col sm={6}>
            <Row>
              <Col xs={12} md={12} sm={12}>
                <Card>
                  <CardHeader>
                    <FesTypography title="공지사항 등록" />
                  </CardHeader>
                  <CardBody>
                    <Formik
                      initialValues={detailData}
                      enableReinitialize
                      onSubmit={(values, { setSubmitting, resetForm }) => {
                        onSaveNotification(values);
                        setSubmitting(false);
                        // resetForm({});
                      }}
                      validationSchema={validateNotification}
                    >
                      {({ values, errors, handleSubmit, handleChange }) => (
                        <Form onSubmit={handleSubmit}>
                          {/* <Row>
                          <Col>
                            <Label>{t('Name')}</Label>
                            <IconStart>*</IconStart>
                            <Input
                              placeholder="Name"
                              onChange={handleChange}
                              value={values.name}
                              name="name"
                            />
                            {errors.name && <FesErrorMessage name="name" />}
                          </Col>
                        </Row> */}
                          <Row>
                            <Col>
                              <Label>{t('제목')}</Label>
                              <IconStart>*</IconStart>
                              <Input
                                placeholder="제목"
                                onChange={handleChange}
                                value={values.title}
                                name="title"
                              />
                              {errors.title && <FesErrorMessage name="title" />}
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={12}>
                              <WrapContent>
                                <div>
                                  <Label>{t('상세 내용 입력')}</Label>
                                </div>
                                <InputContent
                                  placeholder="상세 내용 입력"
                                  onChange={handleChange}
                                  value={values.description}
                                  name="description"
                                />
                                {errors.description && (
                                  <FesErrorMessage name="description" />
                                )}
                              </WrapContent>
                            </Col>
                            <Col sm={6} className="pt-4">
                              <UploadImage
                                item={notificationFile.url}
                                name="logo"
                                fileRefs={inputRefLogo}
                                onChangeFile={onChangeFile}
                                onReset={onReset}
                                loading={loadingImage}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={12} className="text-center pt-3">
                              <Button
                                style={{ marginRight: '1rem' }}
                                onClick={() => history.go(-1)}
                              >
                                {t('이전')}
                              </Button>
                              <Button
                                style={{ backgroundColor: '#2A4365' }}
                                type="submit"
                              >
                                {t('저장')}
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      )}
                    </Formik>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>

          <Col sm={6}>
            <Row
              style={{
                marginTop: '20px',
              }}
            >
              <Col xs={12} md={12} sm={12}>
                <Card>
                  <CardHeader>
                    <FesTypography title="댓글 관리" />
                  </CardHeader>
                </Card>
                <CardBody
                  style={{
                    padding: 0,
                  }}
                >
                  {listComment.results.length > 0 &&
                    listComment.results.map((cmt, index) => (
                      <Col sm={12} className="pt-2" key={cmt._id}>
                        <Card>
                          <CardBody>
                            <ListComment
                              comment={cmt}
                              typing={comment[index]}
                              onChangeValue={e => onChangeValue(e, index)}
                              onHandleComment={e => onHandleComment(e, index)}
                              onDeleteComment={e => onDeleteComment(e, index)}
                              onDeleteReplyAdmin={onDeleteReplyAdmin}
                              positionComment={index}
                              avatarAdmin={profile.avatar}
                            />
                          </CardBody>
                        </Card>
                      </Col>
                    ))}

                  {listComment.total / listComment.limit > 1 && (
                    <Col className="mt-3">
                      <FesPaging
                        paginateData={listComment}
                        handlePageChange={pageNumber =>
                          handlePageChange(pageNumber - 1)
                        }
                      />
                    </Col>
                  )}
                </CardBody>
              </Col>
            </Row>
          </Col>
        </Row>
      </Div>
    </>
  );
});

const Div = styled.div`
  height: 100%;
  padding: 0 1rem;
  background-color: #ecf0f5;

  .bottom-line {
    border-bottom: 1px solid #d2d6de;
  }
`;

const Title = styled.p`
  color: #2c5282;
  font-family: Roboto;
  font-size: 24px;
  font-weight: bold;

  padding-top: 1.5rem;
`;

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
`;

const InputContent = styled.textarea`
  height: 20rem;
`;

const IconStart = styled.span`
  color: red;
  font-size: 22px;
  margin-left: 3px;
`;
