/**
 *
 * ImageManage
 *
 */
import { FesTypography } from 'app/components/FesTypography/Loadable';
import { FesUploadImage } from 'app/components/FesUploadImage/Loadable';
import React, { memo, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { FesButton } from 'app/components/FesButton/Loadable';
import { toast } from 'react-toastify';
import { upLoadImg, createImages } from 'services/adminService';
import { messageSnacks } from 'app/constants';
import { selectBannerPaginate } from 'app/pages/Banners/slice/selectors';
import { useBannerSlice } from 'app/pages/Banners/slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import querryString from 'query-string';
import _ from 'lodash';
import { FesLoading } from 'app/components/FesLoading/Loadable';

interface Props {}

export const ImageManage = memo((props: Props) => {
  const { t } = useTranslation();
  const [idDelete, setIdDelete] = useState<string[]>([]);
  const [loholGoodsURL, setLoholGoodsURL] = useState('');
  const [totalImage, setTotalImage] = useState([
    {
      image: '',
      url: '',
    },
  ]);
  const [totalBanner, setTotalBanner] = useState([
    {
      image: '',
      url: '',
    },
  ]);
  const [totalLohol, setTotalLohol] = useState([
    {
      image: '',
      url: '',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const [loadHome, setLoadHome] = useState([] as any);
  const [loadBanner, setLoadBanner] = useState([] as any);
  const [loadLohol, setLoadLohol] = useState([] as any);

  const fileRefs = useRef({});
  const fileRefs1 = useRef({});
  const fileRefs2 = useRef({});

  const dispatch = useDispatch();
  const { actions } = useBannerSlice();
  const listImage = useSelector(selectBannerPaginate);

  useEffect(() => {
    const query = querryString.stringify({ limit: 30, sortType: 1 });
    dispatch(actions.getListBanner(query));
  }, [actions, dispatch]);

  useEffect(() => {
    if (listImage.loholGoodsURL) {
      setLoholGoodsURL(listImage.loholGoodsURL);
    }

    if (listImage?.results?.length) {
      const { results } = listImage;
      const x: any[] = [];
      const y: any[] = [];
      const z: any[] = [];

      results.map(img => {
        if (img.type === 'top') {
          x.push(img);
        }
        if (img.type === 'bottom') {
          y.push(img);
        }
        if (img.type === 'loholGood') {
          z.push(img);
        }
        return img;
      });

      if (x.length) {
        setTotalImage(x);
      }
      if (y.length) {
        setTotalBanner(y);
      }
      if (z.length) {
        setTotalLohol(z);
      }
    }
  }, [listImage]);

  const onTrigger = useCallback((event, index, reftg) => {
    reftg.current[index].click();
  }, []);

  const onChangeFile = useCallback(
    async (e, indexImg, totalImg, setImg, loader, setLoader) => {
      const newArr = [...totalImg];
      const elmentImg = _.get(newArr[indexImg], '_id');
      if (idDelete.includes(elmentImg)) {
        const ids = idDelete.splice(idDelete.indexOf(elmentImg), 1);
        setIdDelete(ids);
      }

      const file = e.target.files[0];
      const arrLoading = [...loader];
      e.target.value = null;

      arrLoading[indexImg] = true;
      setLoader(arrLoading);

      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await upLoadImg(formData);

        newArr[indexImg].image = res.data.imageLink;
        arrLoading[indexImg] = false;
        messageSnacks.success();

        setImg(newArr);
        setLoader(arrLoading);
      }
    },
    [],
  );

  const onReset = useCallback((e, indexImg, totalImg, setImg) => {
    const imgSetArr = [...totalImg];
    let obj = imgSetArr[indexImg];
    if (_.get(obj, '_id')) {
      setIdDelete(id => [...id, obj._id]);
    }
    imgSetArr[indexImg] = { ...obj, image: '', url: '' };
    setImg(imgSetArr);
  }, []);

  const onDelete = useCallback((e, index, totalImg, setImg) => {
    const newArr = [...totalImg];
    const obj = newArr[index];
    if (_.get(obj, '_id')) {
      setIdDelete(id => [...id, obj._id]);
    }
    newArr.splice(index, 1);
    setImg(newArr);
  }, []);

  const onAddImage = useCallback((total, setTotal) => {
    const newArr = [...total];
    if (newArr.length === 10)
      return toast.error("Can't upload than more 10 image");
    const newItem = {
      image: '',
      url: '',
    };
    newArr.push(newItem);
    setTotal(newArr);
  }, []);

  const handleChange = useCallback((e, indexImg, totalImg, setImg) => {
    const newArr = [...totalImg];
    let obj = newArr[indexImg];
    newArr[indexImg] = { ...obj, url: e.target.value };
    setImg(newArr);
  }, []);

  const onSaveData = useCallback(async () => {
    const data = convertData(totalImage, 'top')
      .concat(convertData(totalBanner, 'bottom'))
      .concat(convertData(totalLohol, 'loholGood'));
    setLoading(true);

    const res = await createImages({
      images: data,
      idsDel: idDelete,
      loholGoodsURL: loholGoodsURL,
    });
    if (!res) {
      setLoading(false);
      return false;
    }
    dispatch(actions.createBannerSuccess(res.data));

    setLoading(false);
    messageSnacks.success();
    setIdDelete([]);
  }, [
    actions,
    dispatch,
    idDelete,
    loholGoodsURL,
    totalBanner,
    totalImage,
    totalLohol,
  ]);

  const convertData = (data, type) => {
    let objData = {};
    const requestData: any[] = [];

    data.map(item => {
      if (item.image) {
        objData = { ...item, image: item.image, url: item.url, type: type };
        requestData.push(objData);
      }
      return item;
    });

    return requestData;
  };

  const handleChangeLoholGoodsURL = useCallback(e => {
    setLoholGoodsURL(e.target.value);
  }, []);

  return (
    <>
      {loading && <FesLoading />}
      <Div>
        <Title>{t('이미지 관리')}</Title>
        <div>
          <Home>
            <FesTypography title="로비 페이지" />
            {totalImage.length &&
              totalImage.map((item, index) => (
                <FesUploadImage
                  key={index}
                  item={item}
                  fileRefs={element => (fileRefs.current[index] = element)}
                  onChangeFile={e =>
                    onChangeFile(
                      e,
                      index,
                      totalImage,
                      setTotalImage,
                      loadHome,
                      setLoadHome,
                    )
                  }
                  onTrigger={e => onTrigger(e, index, fileRefs)}
                  onReset={e => onReset(e, index, totalImage, setTotalImage)}
                  onDelete={e => onDelete(e, index, totalImage, setTotalImage)}
                  handleChange={e =>
                    handleChange(e, index, totalImage, setTotalImage)
                  }
                  keyIndex={index}
                  loading={loadHome[index]}
                />
              ))}
          </Home>
          <WrapButton>
            <FesButton
              onClick={() => onAddImage(totalImage, setTotalImage)}
              color="#FFFCFE"
              title="추가"
            />
          </WrapButton>
        </div>

        <div>
          <Home>
            <FesTypography title="나의 정보에 있는 배너" />
            {totalBanner.length &&
              totalBanner.map((item, index) => (
                <FesUploadImage
                  key={index}
                  item={item}
                  fileRefs={element => (fileRefs1.current[index] = element)}
                  onChangeFile={e =>
                    onChangeFile(
                      e,
                      index,
                      totalBanner,
                      setTotalBanner,
                      loadBanner,
                      setLoadBanner,
                    )
                  }
                  onTrigger={e => onTrigger(e, index, fileRefs1)}
                  onReset={e => onReset(e, index, totalBanner, setTotalBanner)}
                  onDelete={e =>
                    onDelete(e, index, totalBanner, setTotalBanner)
                  }
                  handleChange={e =>
                    handleChange(e, index, totalBanner, setTotalBanner)
                  }
                  keyIndex={index}
                  loading={loadBanner[index]}
                />
              ))}
          </Home>
          <WrapButton>
            <FesButton
              onClick={() => onAddImage(totalBanner, setTotalBanner)}
              color="#FFFCFE"
              title="추가"
            />
          </WrapButton>
        </div>

        <div>
          <Home>
            <FesTypography title="굿즈 이지미 등록하는 화면임" />
            <div className="d-flex pt-4 pb-3">
              <div className="lohol-url">
                <span>링크</span>
              </div>
              <div className="input-lohol">
                <CustomInput
                  value={loholGoodsURL}
                  onChange={handleChangeLoholGoodsURL}
                />
              </div>
            </div>
            {totalLohol.length &&
              totalLohol.map((item, index) => (
                <FesUploadImage
                  key={index}
                  item={item}
                  fileRefs={element => (fileRefs2.current[index] = element)}
                  onChangeFile={e =>
                    onChangeFile(
                      e,
                      index,
                      totalLohol,
                      setTotalLohol,
                      loadLohol,
                      setLoadLohol,
                    )
                  }
                  onTrigger={e => onTrigger(e, index, fileRefs2)}
                  onReset={e => onReset(e, index, totalLohol, setTotalLohol)}
                  onDelete={e => onDelete(e, index, totalLohol, setTotalLohol)}
                  handleChange={e =>
                    handleChange(e, index, totalLohol, setTotalLohol)
                  }
                  keyIndex={index}
                  loading={loadLohol[index]}
                />
              ))}
          </Home>
          <WrapButton>
            <FesButton
              onClick={() => onAddImage(totalLohol, setTotalLohol)}
              color="#FFFCFE"
              title="추가"
            />
          </WrapButton>
        </div>

        <div className="text-center">
          <FesButton onClick={onSaveData} color="#FFFCFE" title="저장" />
        </div>
      </Div>
    </>
  );
});

const Div = styled.div`
  background-color: #ecf0f5;
  padding: 1rem;
  height: 100%;
`;
const WrapButton = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2% 8rem;
`;
const Home = styled.div`
  padding: 25px 70px;

  .lohol-url {
    width: 210px;
    text-align: center;

    span {
      font-weight: bold;
      font-size: 18px;
      line-height: 23px;
      margin-bottom: 5px;
      color: rgb(101, 125, 157);
    }
  }

  .input-lohol {
    width: calc(100% - 15rem);
  }
`;
const Title = styled.p`
  color: #2c5282;
  font-family: Roboto;
  font-size: 24px;
  font-weight: bold;
`;
const CustomInput = styled.input`
  border: 1px solid #2c5282;
  box-sizing: border-box;
  border-radius: 4px;
  height: 40px;
  width: 97.5%;
  padding-right: 4rem;

  outline: none;
`;
