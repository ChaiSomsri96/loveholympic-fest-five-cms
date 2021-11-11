/**
 *
 * ProfileSetting
 *
 */
import _ from 'lodash';
import { FesFileUpload } from 'app/components/FesFileUpload/Loadable';
import { FesInput } from 'app/components/FesInput/Loadable';
import { FesErrorMessage } from 'app/components/Forms';
import { useAuthorizeSlice } from 'app/pages/Authorize/slice';
import { selectMe } from 'app/pages/Authorize/slice/selectors';
import { validateProfie } from 'app/pages/Authorize/validation';
import { validatePasswordCode } from 'app/pages/ProfileSetting/validation';
import { Form, Formik } from 'formik';
import avatarImg from 'images/auth/avatar.png';
import edit from 'images/auth/edit.png';
import Polygon from 'images/icon/Polygon.png';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import { upLoadImg } from 'services/adminService';
import API from 'services/AuthService';
import styled from 'styled-components/macro';
import { useSettingSystemSlice } from 'app/pages/SettingSystem/slice';
import { selectAllSettingSystem } from 'app/pages/SettingSystem/slice/selectors';
import { useModalSlice } from 'app/pages/Modal/slice';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { fileType, getFileType } from 'app/constants';

interface Props {}

export const ProfileSetting = memo((props: Props) => {
  const { t } = useTranslation();
  const profile = useSelector(selectMe);
  const allSettingSystem = useSelector(selectAllSettingSystem);
  const { actions } = useAuthorizeSlice();
  const { actions: settingActions } = useSettingSystemSlice();
  const dispatch = useDispatch();
  const fileRef = React.useRef<HTMLInputElement>(null);
  const history = useHistory();

  const [avatarId, setAvatarId] = useState(avatarImg);
  const [activeTab, setActiveTab] = useState('1');
  const [imageLink, setImageLink] = useState(avatarImg);
  const [name, setName] = useState('');
  const [timeSystem, setTimeSystem] = useState({} as any);

  const [isOpenHolympic, setIsOpenHolympic] = useState(true);
  const [disableResetAllData, setDisableResetAllData] = useState(false);
  const { actions: modalActions } = useModalSlice();

  useEffect(() => {
    dispatch(actions.getProfile({}));
    dispatch(settingActions.getAllSystem({}));
  }, [actions, dispatch, settingActions]);

  useEffect(() => {
    if (profile && profile.avatar) {
      setImageLink(profile.avatar);
    }
    if (profile) {
      setName(profile.name);
    }
  }, [profile]);

  const toggle = useCallback(
    tab => {
      if (activeTab !== tab) setActiveTab(tab);
    },
    [activeTab],
  );

  const onUpLoad = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);

  const onChangeName = useCallback(event => {
    setName(event.target.value);
  }, []);

  const onChangeFile = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    e.target.value = null;

    if (file) {
      const fileSize = file.size / (1024 * 1024);
      if (fileSize > 3) {
        return toast.error('업로드 파일이 3 MB에 초과하면 안 됩니다');
      }
      if (!fileType.includes(getFileType(file.name))) {
        return toast.error('JPG, JPEG, PNG 타입만 업로드 가능합니다.');
      }

      formData.append('image', file);
      const res = await upLoadImg(formData);
      if (!res) return toast.error('업로드 실패하였습니다');
      setAvatarId(res.data._id);
      setImageLink(res.data.imageLink);
    }
  };

  const onSaveProfile = useCallback(async () => {
    try {
      const data = {
        name: name,
      };
      if (imageLink) data['avatar'] = imageLink;
      const res = await API.updateProfile(data);
      if (!res) return toast.error('프로필 업데이트 실패');
      dispatch(actions.getProfile({}));

      return toast.success('프로필 업데이트 완료되었습니다.');
    } catch (error) {
      toast.error('프로필 업데이트 실패');
      throw error;
    }
  }, [name, imageLink, dispatch, actions]);

  const onSavePass = async data => {
    const res = await API.updatePassword(data);
    if (res) return toast.success('성공되었습니다');
  };

  const onSavingSystem = useCallback(() => {
    if (timeSystem.timeFrom.getTime() > timeSystem.timeTo.getTime()) {
      return toast.error('시작일은 종료일보다 클 수 없습니다.');
    }
    dispatch(
      modalActions.showConfirmModal({
        title: '확인',
        description: '모든 정보를 저장 하시겠습니까?',
        onYes: () => {
          dispatch(
            settingActions.updateSystemEvent({
              ...timeSystem,
              isOpenCloseLoveHolympic: isOpenHolympic,
            }),
          );
        },
        onNo: () => {
          dispatch(modalActions.showConfirmModal(false));
        },
      }),
    );
  }, [dispatch, isOpenHolympic, modalActions, settingActions, timeSystem]);

  const onUpdatePasswordCode = useCallback(
    data => {
      dispatch(
        modalActions.showConfirmModal({
          title: '확인',
          description: '모든 정보를 저장 하시겠습니까?',
          onYes: () => {
            dispatch(settingActions.createPasswordCode(data));
          },
          onNo: () => {
            dispatch(modalActions.showConfirmModal(false));
          },
        }),
      );
    },
    [dispatch, modalActions, settingActions],
  );

  const clickOpenHolympic = useCallback(() => {
    setIsOpenHolympic(!isOpenHolympic);
  }, [isOpenHolympic]);

  useEffect(() => {
    const isOpenClose = _.get(
      allSettingSystem,
      'isOpenCloseLoveHolympic',
      true,
    );
    setIsOpenHolympic(isOpenClose);

    const timeFrom =
      allSettingSystem && allSettingSystem.timeFrom
        ? new Date(allSettingSystem.timeFrom)
        : new Date();
    const timeTo =
      allSettingSystem && allSettingSystem.timeTo
        ? new Date(allSettingSystem.timeTo)
        : new Date();

    setTimeSystem({
      timeFrom,
      timeTo,
    });
  }, [allSettingSystem]);

  const onResetDataTest = useCallback(() => {
    dispatch(
      modalActions.showConfirmModal({
        title: '데이터 테스트를 재설정합니다.',
        description: '데이터 테스트를 재설정 하시겠습니까?',
        onYes: () => {
          dispatch(settingActions.resetDataTest({}));
        },
        onNo: () => {
          dispatch(modalActions.showConfirmModal(false));
        },
      }),
    );
  }, [dispatch, modalActions, settingActions]);

  const checkDisableResetAllData = useMemo(() => {
    if (
      moment().isBefore(timeSystem.timeFrom) ||
      moment().isAfter(timeSystem.timeTo)
    ) {
      return false;
    } else {
      return true;
    }
  }, [timeSystem.timeFrom, timeSystem.timeTo]);

  const onSetTimeSystem = useCallback(
    (date, name) => {
      setTimeSystem({ ...timeSystem, [name]: date });
    },
    [timeSystem],
  );

  const onResetAllData = useCallback(() => {
    if (!disableResetAllData) {
      dispatch(
        modalActions.showConfirmModal({
          title: 'Confirm',
          description: '데이터 테스트를 재설정 하시겠습니까?',
          onYes: () => {
            dispatch(settingActions.resetAllData({}));
          },
          onNo: () => {
            dispatch(modalActions.showConfirmModal(false));
          },
        }),
      );
    }
  }, [disableResetAllData, dispatch, modalActions, settingActions]);

  return (
    <Div>
      <Title>{t('프로필 설정')}</Title>
      <WrapTab tabs>
        <NavItem>
          <TabName
            onClick={() => {
              toggle('1');
            }}
            className={activeTab === '1' ? 'activeTab' : ''}
          >
            {t('프로필')}
          </TabName>
        </NavItem>
        <Divider />

        <NavItem>
          <TabName
            onClick={() => {
              toggle('2');
            }}
            className={activeTab === '2' ? 'activeTab' : ''}
          >
            {t('비밀번호 변경')}
          </TabName>
        </NavItem>
        <Divider />

        <NavItem>
          <TabName
            onClick={() => {
              toggle('3');
            }}
            className={activeTab === '3' ? 'activeTab' : ''}
          >
            {t('시스템 설정')}
          </TabName>
        </NavItem>

        <Divider />

        <NavItem>
          <TabName
            onClick={() => {
              toggle('4');
            }}
            className={activeTab === '4' ? 'activeTab' : ''}
          >
            {t('로그인 비밀번호')}
          </TabName>
        </NavItem>
      </WrapTab>

      <WrapContent activeTab={activeTab}>
        <TabPane tabId="1">
          <div style={{ width: '100%' }}>
            <Card>
              <CustomCardHeader>
                <FesFileUpload fileRef={fileRef} onChangeFile={onChangeFile}>
                  <Avatar src={imageLink} />
                  <CustomButton onClick={onUpLoad}>
                    <img src={edit} alt="" />
                  </CustomButton>
                </FesFileUpload>
              </CustomCardHeader>

              <CardBody>
                <BlockInput>
                  <div>
                    <Label>{t('이름')}</Label> <IconStart>*</IconStart>
                  </div>
                  <FesInput
                    placeholder="이름"
                    value={name}
                    onChange={onChangeName}
                  />
                </BlockInput>
                <BlockInput>
                  <div>
                    <Label>{t('접속 아이디')}</Label>
                    <IconStart>*</IconStart>
                  </div>
                  <Input disabled value={profile?.username} />
                </BlockInput>
                <WrapAction>
                  <Button
                    style={{ marginRight: '2rem' }}
                    onClick={() => history.push('/user-codes')}
                  >
                    {t('이전')}
                  </Button>
                  <Button
                    style={{ backgroundColor: '#2A4365' }}
                    onClick={onSaveProfile}
                  >
                    {t('저장')}
                  </Button>
                </WrapAction>
              </CardBody>
            </Card>
          </div>
        </TabPane>

        <TabPane tabId="2">
          <CustomCard>
            <Formik
              initialValues={{
                passwordCurrent: '',
                password: '',
                passwordConfirmation: '',
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                onSavePass(values);
                setSubmitting(false);
                resetForm({});
              }}
              validationSchema={validateProfie}
            >
              {({ values, errors, handleSubmit, handleChange }) => (
                <Form onSubmit={handleSubmit} autoComplete="off">
                  <BlockInput>
                    <div>
                      <Label>{t('현재 비밀번호')} </Label>
                      <IconStart>*</IconStart>
                    </div>
                    <FesInput
                      type="password"
                      onChange={handleChange}
                      value={values.passwordCurrent}
                      name="passwordCurrent"
                    />
                  </BlockInput>
                  {errors.passwordCurrent && (
                    <FesErrorMessage name="passwordCurrent" />
                  )}

                  <BlockInput>
                    <div>
                      <Label>{t('신규 비밀번호')} </Label>
                      <IconStart>*</IconStart>
                    </div>
                    <FesInput
                      type="password"
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                    />
                  </BlockInput>
                  {errors.password && <FesErrorMessage name="password" />}

                  <BlockInput>
                    <div>
                      <Label>{t('신규 비밀번호 확인')} </Label>
                      <IconStart>*</IconStart>
                    </div>
                    <FesInput
                      type="password"
                      onChange={handleChange}
                      value={values.passwordConfirmation}
                      name="passwordConfirmation"
                    />
                  </BlockInput>
                  {errors.passwordConfirmation && (
                    <FesErrorMessage name="passwordConfirmation" />
                  )}

                  <WrapAction>
                    <Button
                      style={{ marginRight: '2rem' }}
                      type="button"
                      onClick={() => history.push('/user-codes')}
                    >
                      {t('이전')}
                    </Button>
                    <Button
                      style={{ backgroundColor: '#2A4365' }}
                      type="submit"
                    >
                      {t('저장')}
                    </Button>
                  </WrapAction>
                </Form>
              )}
            </Formik>
          </CustomCard>
        </TabPane>

        <TabPane tabId="3">
          <Card>
            <CardHeader>
              <strong>설정</strong>
            </CardHeader>

            <CardBody>
              <strong>{t('행사 기간 설정')}</strong>
              <Row>
                <div className="start-date">
                  <DatePicker
                    selected={timeSystem.timeFrom}
                    onChange={date => onSetTimeSystem(date, 'timeFrom')}
                    showTimeSelect
                    minDate={moment().toDate()}
                    timeFormat="HH:mm"
                    name="startDate"
                    dateFormat="yyyy-MM-dd HH:mm"
                  />
                </div>

                <div className="d-flex align-items-center">
                  <img src={Polygon} alt="" />
                </div>

                <Col>
                  <DatePicker
                    selected={timeSystem.timeTo}
                    onChange={date =>
                      setTimeSystem({ ...timeSystem, timeTo: date })
                    }
                    minDate={moment(timeSystem.timeFrom).toDate()}
                    showTimeSelect
                    timeFormat="HH:mm"
                    name="startDate"
                    dateFormat="yyyy-MM-dd HH:mm"
                  />
                </Col>
              </Row>

              <Row
                style={{
                  paddingTop: '20px',
                }}
              >
                <Col sm={12}>
                  <strong>{t('러브 홀림픽 활성화/잠금')}</strong>
                </Col>
                <Col sm={12}>
                  {!!isOpenHolympic && (
                    <Button onClick={clickOpenHolympic} color="success">
                      활성화
                    </Button>
                  )}
                  {!isOpenHolympic && (
                    <Button onClick={clickOpenHolympic} color="danger">
                      닫음
                    </Button>
                  )}
                  <Note>
                    {' '}
                    <IconStart>*</IconStart>행사 기간 동안만 잠금/ 활성화 처리할
                    수 있습니다.
                  </Note>
                </Col>

                <Col sm={12}>
                  <strong>{t('데이터 리셋')}</strong>
                </Col>

                <Col sm={12}>
                  <Button
                    onClick={onResetAllData}
                    disabled={checkDisableResetAllData}
                    color="success"
                  >
                    사용자 데이터 리셋
                  </Button>
                  <Note>
                    <IconStart>*</IconStart>행사 기간 종료해야 리셋 가능합니다
                  </Note>
                </Col>

                <Col sm={12}>
                  <Button onClick={onResetDataTest} color="success">
                    테스트 데이터 리셋
                  </Button>
                  <Note>
                    {' '}
                    <IconStart>*</IconStart>커플 정보, 채팅, 리얼 홀림픽, 소울
                    프랜드를 리셋하기 위합니다
                  </Note>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button
                    style={{ backgroundColor: '#2A4365' }}
                    onClick={onSavingSystem}
                  >
                    저장
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </TabPane>

        <TabPane tabId="4">
          <CustomCard>
            <Formik
              initialValues={{
                password: allSettingSystem.password
                  ? allSettingSystem.password
                  : '',
                // codeLivestream: allSettingSystem.codeLivestream
                //   ? allSettingSystem.codeLivestream
                //   : '',
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log({ values });
                onUpdatePasswordCode(values);
                setSubmitting(false);
                // resetForm({});
              }}
              validationSchema={validatePasswordCode}
              enableReinitialize
            >
              {({ values, errors, handleSubmit, handleChange }) => (
                <Form onSubmit={handleSubmit} autoComplete="off">
                  <BlockInput>
                    <div>
                      <Label>{t('로그인 비밀번호')} </Label>
                      <IconStart>*</IconStart>
                    </div>
                    <FesInput
                      type="password"
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      placeholder="글자/숫자를 포함하여 6자이내 입력 가능"
                    />
                  </BlockInput>
                  {errors.password && <FesErrorMessage name="password" />}

                  {/* <BlockInput>
                    <div>
                      <Label>{t('라이브 방송 비밀번호')} </Label>
                      <IconStart>*</IconStart>
                    </div>
                    <FesInput
                      type="password"
                      onChange={handleChange}
                      value={values.codeLivestream}
                      name="codeLivestream"
                      placeholder="글자/숫자를 포함하여 6자이내 입력 가능"
                    />
                  </BlockInput>
                  {errors.codeLivestream && (
                    <FesErrorMessage name="codeLivestream" />
                  )} */}

                  <WrapAction>
                    <Button
                      style={{ marginRight: '2rem' }}
                      type="button"
                      onClick={() => history.push('/user-codes')}
                    >
                      {t('이전')}
                    </Button>
                    <Button
                      style={{ backgroundColor: '#2A4365' }}
                      type="submit"
                    >
                      {t('저장')}
                    </Button>
                  </WrapAction>
                </Form>
              )}
            </Formik>
          </CustomCard>
        </TabPane>
      </WrapContent>
    </Div>
  );
});

const Div = styled.div`
  height: 100%;
  padding: 0 1rem;
  background: #f5f6f8;

  .row {
    padding-top: 10px;
  }

  strong {
    font-size: 14px;
  }

  .col-sm-12 {
    padding-bottom: 5px;
  }

  .start-date {
    padding: 0 15px;
  }
`;

const Title = styled.p`
  color: #2c5282;
  font-family: Roboto;
  font-size: 24px;
  font-weight: bold;

  padding-top: 1.5rem;
`;

const Avatar = styled.img`
  width: 80px;
  border-radius: 50%;
`;

const CustomButton = styled.button`
  border: none;
  background: #fff;
  padding-top: 40px;
`;

const WrapContent = styled(TabContent)`
  padding: 50px 30px;
`;

const BlockInput = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0px;
`;

const WrapAction = styled.div`
  display: flex;
  justify-content: center;

  padding-top: 80px;
`;

const IconStart = styled.span`
  color: red;
  font-size: 22px;
  margin-left: 3px;
`;

const TabName = styled(NavLink)`
  color: #2c5282;
  border: none;

  &.activeTab {
    color: #2c5282;
    font-weight: bold;
    border-bottom: 1px solid;
  }
`;

const WrapTab = styled(Nav)`
  padding: 5px 30px;
  border-bottom: none;
  align-items: center;
`;

const Divider = styled.div`
  border-right: 1px solid #2c5282;
  margin: 0px 23px;
  width: 22px;
  height: 25px;
`;

const CustomCardHeader = styled(CardHeader)`
  background-color: #fff;
  display: flex;
  justify-content: center;
  height: 100px;
`;

const CustomCard = styled(Card)`
  width: 100%;
  padding: 1rem;
`;

const Note = styled.p`
  display: flex;
  align-items: center;

  padding-top: 5px;
  padding-bottom: 5px;

  border-bottom: 1px solid #d2d6de;
  font-size: 13px;
  font-style: italic;
`;
