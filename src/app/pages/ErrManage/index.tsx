/**
 *
 * ErrManage
 *
 */
import { FesInput } from 'app/components/FesInput/Loadable';
import { FesTable } from 'app/components/FesTable/Loadable';
import React, { memo, useState, useCallback, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Row, Input } from 'reactstrap';
import styled from 'styled-components/macro';
import { SearchIcon } from 'app/components/Icons';
import { defaultPaginate } from 'app/config/filter';
import { useDispatch, useSelector } from 'react-redux';
import { useReportSlice } from 'app/pages/ErrManage/slice';
import { useModalSlice } from 'app/pages/Modal/slice';
import { selectListReport } from 'app/pages/ErrManage/slice/selectors';
import { debounce } from 'lodash';

interface Props {}

export const ErrManage = memo((props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useReportSlice();
  const { actions: modalActions } = useModalSlice();
  const listReport = useSelector(selectListReport);

  const [filter, setFilter] = useState(defaultPaginate);
  const [status, setStatus] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState([
    {
      isCheck: false,
      page: 0,
    },
  ]);

  useEffect(() => {
    dispatch(actions.getListReport({ filter, status }));
  }, [dispatch, actions, filter, status]);

  const handleCheckAll = useCallback(() => {
    const arrayIds = listReport.results.map(item => item._id);
    const { page, limit } = filter;

    const tmpCl = [...selectAll].map(item => {
      if (item.page !== page) {
        item.isCheck = false;
      } else {
        item.isCheck = !item.isCheck;
      }
      return item;
    });

    let checkedCopy: boolean[] = [];
    for (let index = page * limit; index < (page + 1) * limit; index++) {
      checkedCopy[index] = tmpCl[page].isCheck;
    }

    setIds(tmpCl[page].isCheck ? arrayIds : []);
    setChecked(checkedCopy);
    setSelectAll(tmpCl);
  }, [filter, listReport.results, selectAll]);

  const handleSingleCheckbox = useCallback(
    row => {
      const arrayIds = [...ids];
      let checkedCopy = [...checked];
      const { limit, page } = filter;
      checkedCopy[limit * page + row.index] = !checked[
        limit * page + row.index
      ];

      if (checkedCopy[limit * page + row.index] === false) {
        const tmpCl = [...selectAll];
        tmpCl[page].isCheck = false;

        const position = arrayIds.indexOf(row.original._id);
        arrayIds.splice(position, 1);

        setSelectAll(tmpCl);
      } else {
        arrayIds.push(row.original._id);
      }
      setChecked(checkedCopy);
      setIds(arrayIds);
    },
    [checked, filter, ids, selectAll],
  );

  const columns = useMemo(() => {
    const { page, limit } = filter;
    return [
      {
        Header: (
          <input
            type="checkbox"
            onChange={handleCheckAll}
            checked={selectAll[page].isCheck}
          />
        ),
        accessor: 'selection',
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={checked[limit * page + row.index]}
            onChange={() => handleSingleCheckbox(row)}
          />
        ),
        sortable: false,
        filterable: false,
      },
      {
        Header: '사용자 번호',
        accessor: 'user.code',
        Cell: ({ cell }) => <span>{cell.value}</span>,
      },
      {
        Header: '사용자명',
        accessor: 'user.nickname',
        Cell: ({ cell }) => <span>{cell.value}</span>,
      },
      {
        Header: '전화번호',
        accessor: 'user.phone',
        Cell: ({ cell }) => <span>{cell.value}</span>,
      },
      {
        Header: '신고 당하기 횟수',
        accessor: 'totalReport',
      },
    ];
  }, [checked, filter, handleCheckAll, handleSingleCheckbox, selectAll]);

  const handlePageChange = useCallback(
    page => {
      let tmpCl = [...selectAll];
      tmpCl[page] = {
        isCheck: tmpCl[page] ? tmpCl[page].isCheck : false,
        page: page,
      };
      setSelectAll(tmpCl);
      setFilter({
        ...filter,
        page,
      });
    },
    [filter, selectAll],
  );

  const handleBlock = useCallback(() => {
    dispatch(
      modalActions.showConfirmModal({
        title: '확인',
        description: '사용자를 차단 / 차단 해제 하시겠습니까?',
        onYes: () => {
          dispatch(actions.blockUser({ ids, status }));
          setChecked([]);
          setSelectAll([
            {
              isCheck: false,
              page: 0,
            },
          ]);
        },
        onNo: () => {
          dispatch(modalActions.showConfirmModal(false));
        },
      }),
    );
  }, [actions, dispatch, ids, modalActions, status]);

  const fetchDataSearch = useCallback(
    value => {
      dispatch(actions.search(value));
    },
    [actions, dispatch],
  );

  const debounceHandle = debounce(
    nextValue => fetchDataSearch(nextValue),
    1000,
  );

  const handleSearch = useCallback(
    e => {
      const { value } = e.target;
      debounceHandle(value);
    },
    [debounceHandle],
  );

  return (
    <Div>
      <Title>{t('위반신고 관리')}</Title>
      <Row>
        <Col sm={4} className="d-flex align-items-center">
          <FesInput
            placeholder="사용자명 또는 위반내용 검색"
            onChange={handleSearch}
          />
          <span className="display-icon">
            <SearchIcon />
          </span>
        </Col>
        <Col sm={2}>
          <CustomInput
            type="select"
            name="block"
            value={status}
            onChange={e => setStatus(e.target.value === 'true')}
          >
            <option value={'false'}>{t('잠금')}</option>
            <option value={'true'}>{t('해체')}</option>
          </CustomInput>
        </Col>
        <Col sm={12} className="text-right">
          <Button color="danger" className="pr-4 pl-4" onClick={handleBlock}>
            {status ? '잠금' : '해체'}
          </Button>
        </Col>

        <Col sm={12} className="pt-3">
          <FesTable
            data={listReport.results}
            columns={columns}
            paginateData={listReport}
            handlePageChange={currentPage => handlePageChange(currentPage - 1)}
          />
        </Col>
      </Row>
    </Div>
  );
});

const Div = styled.div`
  background-color: #ecf0f5;
  padding: 1rem;
  height: 100%;

  .display-icon {
    position: absolute;
    right: 30px;
  }
`;

const Title = styled.p`
  color: #2c5282;
  font-family: Roboto;
  font-size: 24px;
  font-weight: bold;

  padding-top: 1.5rem;
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
