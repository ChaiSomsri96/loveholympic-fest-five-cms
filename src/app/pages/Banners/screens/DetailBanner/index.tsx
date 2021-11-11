/**
 *
 * DetailBanner
 *
 */
import { UploadImage } from 'app/components/UploadImage/Loadable';
import React, { memo, useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, CardHeader } from 'reactstrap';
import { upLoadImg } from 'services/adminService';
import styled from 'styled-components/macro';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useBannerSlice } from 'app/pages/Banners/slice';
import { selectBannerDetail } from 'app/pages/Banners/slice/selectors';
import { fileType, getFileType, typeBanner } from 'app/constants';
import { messageSnacks } from 'app/constants';

interface Props {}
interface ParamTypes {
  id: string;
}

export const DetailBanner = memo((props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { actions } = useBannerSlice();
  const [infoImage, setInfoImage] = useState({
    _id: '',
    url: '',
    description: '',
    file: '',
    type: '',
  });
  const { id } = useParams<ParamTypes>();
  let fileRefs = React.useRef<HTMLInputElement[]>(null);
  const detailData = useSelector(selectBannerDetail);

  useEffect(() => {
    if (history.location.pathname !== '/banners/add') {
      dispatch(actions.getBannerDetail(id));
    } else {
      dispatch(actions.clearDataBanner({}));
    }
  }, [actions, dispatch, history.location.pathname, id]);

  const onChangeFile = async e => {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size / (1024 * 1024);
      const objectUrl = URL.createObjectURL(file);
      if (fileSize > 3) {
        return toast.error('업로드 파일이 3 MB에 초과하면 안 됩니다');
      }
      if (!fileType.includes(getFileType(file.name))) {
        return toast.error('업로드 실패하였습니다');
      }
      setInfoImage({
        ...infoImage,
        url: objectUrl,
        file: file,
      });
    }
  };

  const onChangeCap = useCallback(
    event => {
      setInfoImage({
        ...infoImage,
        description: event.target.value,
      });
    },
    [infoImage],
  );

  const handleUpLoadImage = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append('image', infoImage.file);
      const res = await upLoadImg(formData);
      if (!res) return toast.error('업로드 실패하였습니다');
      setInfoImage({
        ...infoImage,
        _id: res.data._id,
        url: res.data.imageFeatureLink,
      });
      return messageSnacks.success();
    } catch (error) {
      toast.error('업로드 실패하였습니다');
      throw error;
    }
  }, [infoImage]);

  const onSubmit = useCallback(async () => {
    if (!infoImage._id && !infoImage.description && !infoImage.type)
      return messageSnacks.uploadFail();

    const data = {
      image: infoImage.url || detailData.image,
      description: infoImage.description || detailData.description,
      isActive: true,
      position: 1,
      type: infoImage.type || detailData.type,
    };
    if (!detailData._id) {
      dispatch(actions.createBanner(data));
    } else {
      const _id = detailData._id;
      dispatch(actions.editBanner({ data, _id }));
    }
  }, [actions, detailData, dispatch, infoImage]);

  return (
    <Div>
      <Title>{t('배너')}</Title>
      <CustomCard>
        <CardHeader>
          <span>{t('배너')}</span>
        </CardHeader>
        <div style={{ paddingLeft: '1rem', paddingTop: '1rem' }}>
          <div className="d-flex">
            <div>
              <UploadImage
                isBanner
                item={infoImage.url || detailData.image}
                fileRefs={fileRefs}
                onChangeFile={onChangeFile}
                onChangeCap={onChangeCap}
                description={infoImage.description || detailData.description}
                handleUpLoadImage={handleUpLoadImage}
              />
            </div>
            <div className="type-banner">
              <CustomSelect
                onChange={e =>
                  setInfoImage({ ...infoImage, type: e.target.value })
                }
                value={infoImage.type || detailData.type}
              >
                <option value={typeBanner.TOP}>{t('홈')}</option>
                <option value={typeBanner.BOTTOM}>{t('프로필')}</option>
              </CustomSelect>
            </div>
          </div>
          <WrapButton>
            <Button color="primary" onClick={onSubmit}>
              저장
            </Button>
          </WrapButton>
        </div>
      </CustomCard>
    </Div>
  );
});

const Div = styled.div`
  height: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background-color: #ecf0f5;
`;

const WrapButton = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2% 11%;
`;

const Title = styled.p`
  color: #2c5282;
  font-family: Roboto;
  font-size: 24px;
  font-weight: bold;

  padding-top: 1rem;
`;

const CustomCard = styled(Card)`
  width: 50%;

  .type-banner {
    padding: 10px 0px;
  }
`;

const CustomSelect = styled.select`
  border-radius: 0;
  padding: 6px 12px;
  font-size: 15px;

  :focus {
    border-color: #3c8dbc;
    box-shadow: none;
  }
`;
