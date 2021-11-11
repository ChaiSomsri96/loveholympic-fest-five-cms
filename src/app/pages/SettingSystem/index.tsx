/**
 *
 * SettingSystem
 *
 */
import React, { memo, useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
} from 'reactstrap';
import styled from 'styled-components/macro';
import { UploadImage } from 'app/components/UploadImage/Loadable';
import { upLoadImg, createSettingSystem } from 'services/adminService';
import { toast } from 'react-toastify';
import { fileType, getFileType } from 'app/constants';
import { useGoldenTicketSlice } from 'app/pages/GoldenTicket/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectTimeSystem } from 'app/pages/GoldenTicket/slice/selectors';
import { messageSnacks } from 'app/constants';

interface Props {}

export const SettingSystem = memo((props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useGoldenTicketSlice();
  const dataSystem = useSelector(selectTimeSystem);
  const [infoSetting, setInfoSetting] = useState({
    loholGoodsURL: '',
  });
  const [logoSystem, setLogoSystem] = useState({
    _id: '',
    url: '',
    file: '',
  });
  const inputRefLogo = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(actions.getTimeSystem({}));
  }, [actions, dispatch]);

  useEffect(() => {
    if (dataSystem) {
      setInfoSetting({
        loholGoodsURL: dataSystem.loholGoodsURL ? dataSystem.loholGoodsURL : '',
      });
      setLogoSystem({
        _id: '',
        file: '',
        url: dataSystem.iconNotificationSystem,
      });
    }
  }, [dataSystem]);

  const onChangeFile = async e => {
    const file = e.target.files[0];
    const fileSize = file.size / (1024 * 1024);
    const formData = new FormData();

    if (file) {
      if (fileSize > 3) {
        return toast.error('업로드 파일이 3 MB에 초과하면 안 됩니다');
      }
      if (!fileType.includes(getFileType(file.name))) {
        return toast.error('업로드 실패하였습니다');
      }

      formData.append('image', file);
      const res = await upLoadImg(formData);
      if (!res) return toast.error('업로드 실패하였습니다');
      setLogoSystem({
        ...logoSystem,
        _id: res.data._id,
        url: res.data.imageLink,
      });
    }
  };

  const onChaneLoholURl = event => {
    setInfoSetting({
      ...infoSetting,
      loholGoodsURL: event.target.value,
    });
  };

  const onSubmitURL = async () => {
    const { loholGoodsURL } = infoSetting;
    if (!loholGoodsURL) return toast.error('LoholURL is required');
    let data = {
      loholGoodsURL: loholGoodsURL,
    };
    const res = await createSettingSystem(data);
    if (!res) return toast.error(messageSnacks.fail());
    return messageSnacks.success();
  };

  const onSubmitIcon = async () => {
    if (!logoSystem._id) return toast.error('Failed! Please upload image');
    const data = {
      iconNotificationSystem: logoSystem.url,
    };
    const res = await createSettingSystem(data);
    if (!res) return messageSnacks.fail();
    return messageSnacks.success();
  };

  return (
    <Div>
      <Row>
        <Col sm={12}>
          <Title>{t('Setting System')}</Title>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>{t('로홀 구즈')}</CardHeader>
            <CardBody>
              <Row>
                <Col sm={12} className="pt-3">
                  <Input
                    value={infoSetting.loholGoodsURL}
                    placeholder="loholGoodsURL"
                    onChange={onChaneLoholURl}
                  />
                </Col>
              </Row>
              <Button color="primary" className="mt-4" onClick={onSubmitURL}>
                {t('저장')}
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <CardHeader>{t('시스템 로고')}</CardHeader>
            <CardBody>
              <UploadImage
                item={logoSystem.url}
                fileRefs={inputRefLogo}
                onChangeFile={onChangeFile}
              />
              <Button color="primary" className="mt-4" onClick={onSubmitIcon}>
                {t('저장')}
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Div>
  );
});

const Div = styled.div`
  padding: 2rem 1rem;
  background-color: #ecf0f5;
  height: 100%;
`;

const Title = styled.p`
  color: #2c5282;
  font-family: Roboto;
  font-size: 24px;
  font-weight: bold;
`;
