/**
 *
 * UserManage
 *
 */
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { exportDataUser } from 'services/userService';
import { Button, Col, Input, Row } from 'reactstrap';
import styled from 'styled-components/macro';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import FileDownload from 'js-file-download';

import { FesLoading } from 'app/components/FesLoading/Loadable';
import { FesTable } from 'app/components/FesTable/Loadable';
import { No as NumberColumn } from 'app/components/RenderColumns';
import { ExportIcon, SearchIcon } from 'app/components/Icons';
import { defaultPaginate } from 'app/config/filter';
import { useUserSlice } from 'app/pages/Users/slice';
import {
  selectUserPaginate,
  selectLoading,
} from 'app/pages/Users/slice/selectors';
import { sort } from 'app/constants';
import Polygon from 'images/icon/Polygon.png';
import heart from 'images/icon/heart.png';

interface Props {}

export const ListUser = memo((props: Props) => {
  const { t } = useTranslation();
  const { actions } = useUserSlice();
  const dispatch = useDispatch();
  const history = useHistory();

  const userPaginate = useSelector(selectUserPaginate);
  const loading = useSelector(selectLoading);
  const [download, setDownload] = useState(false);

  const [filter, setFilter] = useState({
    ...defaultPaginate,
    sortBy: 'createdAt',
    rankingFrom: '',
    rankingTo: '',
    search: '',
  });
  const [filterRanking, setFilterRanking] = useState({
    rankingFrom: '',
    rankingTo: '',
  });
  // const [dataExport, setDataExport] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: '순번',
        accessor: 'stt',
        Cell: cell => <NumberColumn cell={cell} pageNumber={userPaginate} />,
      },
      {
        Header: '사용자 번호',
        accessor: 'userID',
        Cell: ({ cell }) => {
          return cell.value
            ? `USER${cell.value.substr(cell.value.length - 5).toUpperCase()}`
            : '-';
        },
      },
      {
        Header: '사용자명',
        accessor: 'nickname',
      },
      {
        Header: '전화번호',
        accessor: 'phone',
      },
      {
        Header: '순위',
        accessor: 'ranking',
      },
      {
        Header: '하트 개수',
        accessor: 'totalHeart',
        Cell: ({ cell }) => {
          return (
            <>
              <img src={heart} alt="" />
              <span className="ml-2">{cell.value}</span>
            </>
          );
        },
      },
      {
        Header: '러핑 테스트',
        accessor: 'luffing',
        Cell: ({ cell }) => {
          const {
            lovePoint,
            intellectPoint,
            spiritPoint,
            responsibilityPoint,
            innocencePoint,
          } = cell.row.original;
          return (
            parseFloat(
              lovePoint +
                intellectPoint +
                spiritPoint +
                responsibilityPoint +
                innocencePoint,
            ) / 5
          ).toFixed(2);
        },
      },
      {
        Header: '성별',
        accessor: 'gender',
        Cell: ({ cell }) =>
          cell.value ? (cell.value === 'male' ? '남자' : '여자') : '--',
      },
      {
        Header: '상대 이름',
        accessor: 'target',
      },
      {
        Header: '당첨결과',
        accessor: 'result',
      },
    ],
    [userPaginate],
  );

  useEffect(() => {
    dispatch(actions.getListUser(queryString.stringify(filter)));
  }, [actions, dispatch, filter]);

  const handlePageChange = useCallback(
    page => {
      setFilter({
        ...filter,
        page,
      });
    },
    [filter],
  );

  const onClickDetailUser = useCallback(
    row => {
      const { _id } = row;
      history.push(`/users/detail/${_id}`);
    },
    [history],
  );

  const handleChange = useCallback(
    e => {
      const { name, value } = e.target;
      const clf = { ...filter };
      clf[name] = value;
      setFilter(clf);
    },
    [filter],
  );

  const handleFilter = useCallback(() => {
    const { rankingFrom, rankingTo } = filterRanking;
    if (rankingTo && parseInt(rankingFrom) > parseInt(rankingTo)) {
      return toast.error('Filter limit ranking invalid!');
    }
    setFilter({
      ...filter,
      rankingFrom,
      rankingTo,
    });
  }, [filter, filterRanking]);

  const debounceHandle = debounce(nextValue => {
    setFilter(nextValue);
  }, 1000);

  const onSearch = useCallback(
    e => {
      const { value, name } = e.target;
      const clf = { ...filter };
      clf[name] = value;
      debounceHandle(clf);
    },
    [debounceHandle, filter],
  );

  const onChangeOrder = useCallback(
    e => {
      const { value, name } = e.target;
      setFilterRanking({
        ...filterRanking,
        [name]: value,
      });
    },
    [filterRanking],
  );

  const handleExportData = async () => {
    try {
      setDownload(true);
      const response = await exportDataUser(
        `users/export-user?${queryString.stringify(filter)}`,
      );
      await new Promise(resolve => setTimeout(resolve, 2000));
      FileDownload(response, '사용자 리스트.xlsx');
      setDownload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {(loading || download) && <FesLoading />}
      <Div>
        <Row>
          <Col sm={12} className="pt-1">
            <Title>{t('사용자관리- 사용자 리스트')}</Title>
          </Col>
          <Col xs={6} sm={3} className="d-flex align-items-center">
            <CustomInput
              name="search"
              placeholder="사용자 번호/ 이름/ 코드 번호. 기준으로 검색"
              onChange={onSearch}
            />
            <span className="display-icon">
              <SearchIcon />
            </span>
          </Col>
          <Col xs={6} sm={1}>
            <CustomInput type="select" name="gender" onChange={handleChange}>
              <option value={''}>{t('모두')}</option>
              <option value={'male'}>{t('남자')}</option>
              <option value={'female'}>{t('여자')}</option>
            </CustomInput>
          </Col>
          <Col xs={6} sm={1}>
            <CustomInput type="select" name="type" onChange={handleChange}>
              <option value={''}>{t('모두')}</option>
              <option value={'solo'}>{t('솔로')}</option>
              <option value={'couple'}>{t('커플')}</option>
              <option value={'married'}>{t('결혼')}</option>
            </CustomInput>
          </Col>
          <Col xs={6} sm={2}>
            <CustomInput type="select" name="ranking" onChange={handleChange}>
              <option value={sort.desc}>{t('순위 내림차순')}</option>
              <option value={sort.asc}>{t('순위 오름차순')}</option>
            </CustomInput>
          </Col>
          <Col xs={6} sm={2}>
            <CustomInput
              type="select"
              name="totalHeart"
              onChange={handleChange}
            >
              <option value={sort.desc}>{t('하트 개수 내림차순')}</option>
              <option value={sort.asc}>{t('하트 개수 오름차순')}</option>
            </CustomInput>
          </Col>
          <Col xs={6} sm={2}>
            <CustomInput
              type="select"
              name="luffingTest"
              onChange={handleChange}
            >
              <option value={sort.asc}>{'러핑 테스트 점수 내림차순'}</option>
              <option value={sort.desc}>{'러핑 테스트 점수 오름차순'}</option>
            </CustomInput>
          </Col>
          <Col xs={6} sm={2} className="mt-4">
            <CustomInput
              type="select"
              name="isGoldenTicket"
              onChange={handleChange}
            >
              <option value={''}>{t('모두')}</option>
              <option value={2}>{t('당첨')}</option>
              <option value={3}>{t('미당첨')}</option>
            </CustomInput>
          </Col>
        </Row>
        <Row>
          <Col sm={7} className="pt-4">
            <Div className="wrap-filter">
              <CustomInput
                name="rankingFrom"
                type="number"
                value={filterRanking.rankingFrom}
                onChange={onChangeOrder}
              />
              <img style={{ margin: '0 10px' }} src={Polygon} alt="" />
              <CustomInput
                name="rankingTo"
                type="number"
                value={filterRanking.rankingTo}
                onChange={onChangeOrder}
              />
            </Div>
            <ButtonFilter onClick={handleFilter}>
              {t('순위 필터링')}
            </ButtonFilter>
          </Col>
          <Col sm={5} className="pt-4 text-right pr-5">
            <Button color="success" onClick={handleExportData}>
              <ExportIcon />
              <span style={{ marginLeft: '10px' }}>엑셀 다운로드</span>
            </Button>
          </Col>

          <Col sm={12} className="pt-5">
            <FesTable
              columns={columns}
              data={userPaginate.results}
              handlePageChange={currentPage =>
                handlePageChange(currentPage - 1)
              }
              paginateData={userPaginate}
              onClickRow={row => onClickDetailUser(row)}
            />
          </Col>
        </Row>
      </Div>
    </>
  );
});

const Div = styled.div`
  background-color: #ecf0f5;
  padding: 1rem;
  height: 100%;

  &.wrap-filter {
    padding: 0;
    margin-right: 1rem;
    width: 40%;

    display: flex;
    align-items: center;
    float: left;
  }

  .display-icon {
    position: relative;
    right: 30px;
  }
`;

const Title = styled.p`
  color: #2c5282;
  font-family: Roboto;
  font-size: 24px;
  font-weight: bold;
`;

const CustomInput = styled(Input)`
  border-radius: 0;
  padding: 6px 12px;
  font-size: 15px;

  :focus {
    border-color: #3c8dbc;
    box-shadow: none;
  }
`;

const ButtonFilter = styled.button`
  background-color: #3c8dbc;
  border-color: #367fa9;
  color: #fff;
  padding: 6px 20px;
  box-shadow: none;
  border: 1px solid transparent;
  border-radius: 3px;

  :hover {
    background-color: #367fa9;
  }
`;
