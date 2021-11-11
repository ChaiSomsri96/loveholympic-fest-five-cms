/**
 *
 * Setting
 *
 */
import { FesLoading } from 'app/components/FesLoading/Loadable';
import { UploadImage } from 'app/components/UploadImage/Loadable';
import { fileType, getFileType } from 'app/constants';
import { Results } from 'app/pages/GoldenTicket/screens';
import { AddEditTicket } from 'app/pages/GoldenTicket/screens/AddEditTicket/Loadable';
import { useGoldenTicketSlice } from 'app/pages/GoldenTicket/slice';
import {
  selectListCode,
  selectLoading,
  selectTickets,
} from 'app/pages/GoldenTicket/slice/selectors';
import _ from 'lodash';
import moment from 'moment';
import React, { memo, useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import { upLoadImg } from 'services/adminService';
// import { createTicket } from 'services/goldenTicket';
import styled from 'styled-components/macro';

interface Props {}

export const Setting = memo((props: Props) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('2');

  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = useGoldenTicketSlice();

  const listTicket = useSelector(selectTickets);
  const listCodes = useSelector(selectListCode);
  const loading = useSelector(selectLoading);

  const [startDate, setStart] = useState(new Date());
  const [endDate, setEnd] = useState(new Date());
  const [globalImg, setGlobalImg] = useState({
    url: '',
    file: '',
    id: '',
  });
  const [values, setValues] = useState([
    {
      name: '',
      users: [] as any,
      random: 0,
      imageLucky: '',
      defaultOptions: [] as any,
    },
  ]);
  const [options, setOptions] = useState<any[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const inputRefLogo = React.useRef<HTMLInputElement>(null);
  const [loadingImg, setLoadingImg] = useState(false);
  const [loadingImgTicket, setLoadingImgTicket] = useState([] as any);

  useEffect(() => {
    dispatch(actions.getListGoldenTicket({}));
    dispatch(actions.getListcode({}));
  }, [actions, dispatch]);

  useEffect(() => {
    if (listTicket?.timeFrom && listTicket?.timeTo) {
      setStart(new Date(listTicket.timeFrom));
      setEnd(new Date(listTicket.timeTo));
    }

    if (listTicket.tickets?.length) {
      let tmpArr: any[] = [];

      listTicket.tickets.map(item => {
        let tmpDefaultOptions: any = [];
        item.users?.length &&
          item.users.map(user => {
            return tmpDefaultOptions.push({
              label: user.nickname,
              sublabel: user.phone,
              value: user._id,
            });
          });

        return tmpArr.push({
          name: _.get(item, 'name'),
          random: _.get(item, 'random'),
          imageLucky: _.get(item, 'imageLucky'),
          users: _.map(item.users, '_id') || [],
          _id: _.get(item, '_id'),
          defaultOptions: tmpDefaultOptions,
        });
      });

      setValues(tmpArr);
      setGlobalImg({
        file: '',
        id: '',
        url: listTicket.imageGlobal,
      });
    }

    if (listCodes?.length) {
      let tmpArr: any[] = [];
      listCodes.map(code => {
        tmpArr.push({
          value: code._id,
          label: code.nickname,
          sublabel: code.phone,
        });
        return code;
      });

      setOptions(tmpArr);
    }
  }, [listCodes, listTicket]);

  const toggle = useCallback(
    tab => {
      if (activeTab !== tab) setActiveTab(tab);
    },
    [activeTab],
  );

  const onChangeFile = async e => {
    setLoadingImg(true);
    e.preventDefault();
    const file = e.target.files[0];
    e.target.value = null;

    if (file) {
      const fileSize = file.size / (1024 * 1024);
      if (fileSize > 3) {
        return toast.error('업로드 파일이 3 MB에 초과하면 안 됩니다');
      }
      if (!fileType.includes(getFileType(file.name))) {
        return toast.error('업로드 실패하였습니다');
      }

      const formData = new FormData();
      formData.append('image', file);
      const res = await upLoadImg(formData);
      if (!res) return toast.error('업로드 실패하였습니다');
      setGlobalImg({
        ...globalImg,
        url: res.data.imageLink,
        id: res.data._id,
      });
      setLoadingImg(false);
    }
  };

  const onAddTicket = useCallback(() => {
    const newArr = [...values];
    if (newArr.length === 10)
      return toast.error("Can't upload than more 10 image");
    const newItem = {
      name: '',
      users: [] as any,
      random: 0,
      imageLucky: '',
      defaultOptions: [] as any,
    };
    newArr.push(newItem);
    setValues(newArr);
  }, [values]);

  const handleChange = useCallback(
    (e, index) => {
      const newArr = [...values];
      const tmpObj = newArr[index];
      newArr[index] = { ...tmpObj, name: e.target.value };
      setValues(newArr);
    },
    [values],
  );

  const handleChangeRandom = useCallback(
    (e, index) => {
      const newArr = [...values];
      const tmpObj = newArr[index];
      newArr[index] = { ...tmpObj, random: Number(e.target.value) };
      setValues(newArr);
    },
    [values],
  );

  const handleChangeTopics = (txtUser, data, index) => {
    const newArr = [...values];
    const tmpObj = newArr[index];
    newArr[index] = {
      ...tmpObj,
      users: _.map(data, 'value'),
      defaultOptions: data,
    };
    const x = _.differenceBy(options, data, 'value');
    setOptions(x);
    setValues(newArr);
  };

  const onChangeFileTicket = async (e, index) => {
    e.preventDefault();
    const file = e.target.files[0];
    const newArr = [...values];
    const tmpObj = newArr[index];
    const tmpLoading = [...loadingImgTicket];
    tmpLoading[index] = true;
    setLoadingImgTicket(tmpLoading);

    if (file) {
      const fileSize = file.size / (1024 * 1024);
      if (fileSize > 3) {
        return toast.error('업로드 파일이 3 MB에 초과하면 안 됩니다');
      }
      if (!fileType.includes(getFileType(file.name))) {
        return toast.error('업로드 실패하였습니다');
      }

      const formData = new FormData();
      formData.append('image', file);
      const res = await upLoadImg(formData);
      if (!res) return toast.error('업로드 실패하였습니다');
      newArr[index] = { ...tmpObj, imageLucky: res.data.imageLink };
      tmpLoading[index] = false;
      setValues(newArr);
      setLoadingImgTicket(tmpLoading);
    }
  };

  const onResetGlobal = useCallback(() => {
    setGlobalImg({
      url: '',
      id: '',
      file: '',
    });
  }, []);

  const onReset = useCallback(
    (e, index) => {
      e.preventDefault();
      const newArr = [...values];
      const tmpObj = newArr[index];
      newArr[index] = { ...tmpObj, imageLucky: '' };
      setValues(newArr);
    },
    [values],
  );

  const handleDeleteTicket = useCallback(
    (e, index) => {
      e.preventDefault();
      const newArr = [...values];
      let newIds: string[] = [];
      const _id = _.get(newArr[index], '_id');
      if (_id) {
        newIds = [...ids, _id];
      }
      newArr.splice(index, 1);
      setValues(newArr);
      setIds(newIds);
    },
    [ids, values],
  );

  const handleSaveTicket = useCallback(async () => {
    if (!globalImg.url) return toast.error('이미지 골든 티켓이 필요합니다');
    if (startDate.getTime() > endDate.getTime()) {
      return toast.error('시작일은 종료일보다 클 수 없습니다.');
    }

    if (values.length === 0) {
      return toast.error('최소한 하나의 티켓이 있어야합니다.');
    }

    const data = {
      timeFrom: startDate,
      timeTo: endDate,
      imageGlobal: globalImg.url,
      tickets: values,
      isDel: ids,
    };

    dispatch(actions.addGoldenTicket(data));
    setIds([]);
  }, [actions, dispatch, endDate, globalImg.url, ids, startDate, values]);

  return (
    <>
      {loading && <FesLoading />}
      <Div>
        <Title>{t('수상관리')}</Title>
        <WrapTab tabs>
          <NavItem>
            <TabName
              onClick={() => {
                toggle('2');
              }}
              className={activeTab === '2' ? 'activeTab' : ''}
            >
              {t('수상설정')}
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
              {t('당첨결과')}
            </TabName>
          </NavItem>
        </WrapTab>

        <WrapContent activeTab={activeTab}>
          <TabPane tabId="2">
            <Row>
              <div className="mr-4">
                <strong className="mr-2">{t('시상 시작일시')}</strong>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStart(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  minDate={moment().toDate()}
                  name="startDate"
                  dateFormat="yyyy-MM-dd HH:mm"
                />
              </div>
              <div>
                <strong className="mr-2">{t('시상 마감 일시')}</strong>
                <DatePicker
                  selected={endDate}
                  onChange={date => setEnd(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  minDate={moment(startDate).toDate()}
                  name="endDate"
                  dateFormat="yyyy-MM-dd HH:mm"
                />
              </div>
              <Col sm={12} className="mt-5 d-flex">
                <div className="mr-4">
                  <span>골든 티켓 이미지</span>
                </div>
                <UploadImage
                  loading={loadingImg}
                  item={globalImg.url}
                  fileRefs={inputRefLogo}
                  onChangeFile={onChangeFile}
                  onReset={onResetGlobal}
                />
              </Col>
              <Col>
                {values.map((ticket, index) => (
                  <AddEditTicket
                    key={index}
                    ticket={ticket}
                    onReset={e => onReset(e, index)}
                    listCodes={options}
                    handleChange={e => handleChange(e, index)}
                    handleChangeRandom={e => handleChangeRandom(e, index)}
                    handleChangeTopics={(users, data) =>
                      handleChangeTopics(users, data, index)
                    }
                    onChangeFileTicket={e => onChangeFileTicket(e, index)}
                    handleDeleteTicket={e => handleDeleteTicket(e, index)}
                    loading={loadingImgTicket[index]}
                  />
                ))}
              </Col>
              <Col sm={12} className="mt-3">
                <Button
                  style={{ backgroundColor: '#2A4365' }}
                  onClick={onAddTicket}
                >
                  {t('등수 추가')}
                </Button>
              </Col>
              <Col sm={12} className="mt-4 d-flex justify-content-center">
                <Button
                  color="secondary"
                  className="mr-3"
                  onClick={() => history.push('/user-codes')}
                >
                  이전
                </Button>
                <Button
                  style={{ backgroundColor: '#2A4365' }}
                  onClick={handleSaveTicket}
                >
                  저장
                </Button>
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="3">
            <Results start={startDate} end={endDate} />
          </TabPane>
        </WrapContent>
      </Div>
    </>
  );
});

const Div = styled.div`
  background-color: #ecf0f5;
  height: 100%;
  padding: 1rem;

  input {
    outline: none;
    padding: 5px;
    border: 1px solid #e4e4e4;
  }

  strong {
    color: '#406c97';
  }

  .field-select {
    width: 10rem;
  }

  .golden-prize {
    background-color: #b7d8eb;
    padding: 1rem;
  }
`;

const Title = styled.p`
  color: #2c5282;
  font-family: Roboto;
  font-size: 24px;
  font-weight: bold;

  padding-top: 1.5rem;
`;

const WrapTab = styled(Nav)`
  padding: 5px 10px;
  border-bottom: none;
  align-items: center;
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

const Divider = styled.div`
  border-right: 1px solid #2c5282;
  margin: 0px 23px;
  width: 22px;
  height: 25px;
`;

const WrapContent = styled(TabContent)`
  padding: 50px 30px;
`;
