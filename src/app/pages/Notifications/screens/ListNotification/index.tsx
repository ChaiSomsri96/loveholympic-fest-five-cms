/**
 *
 * ListNotification
 *
 */
import { FesTable } from 'app/components/FesTable/Loadable';
import { FesInput } from 'app/components/FesInput/Loadable';
import { FesLoading } from 'app/components/FesLoading/Loadable';
import {
  No as NumberColumn,
  RenderEffect,
  FesAction as Action,
  DateTime,
} from 'app/components/RenderColumns';
import React, { memo, useEffect, useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Col, Row, Button } from 'reactstrap';
import { useNotificationSlice } from 'app/pages/Notifications/slice';
import { useModalSlice } from 'app/pages/Modal/slice';
import {
  selectNotification,
  selectLoading,
} from 'app/pages/Notifications/slice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { defaultPaginate } from 'app/config/filter';
import { SearchIcon } from 'app/components/Icons';
import { debounce } from 'lodash';

interface Props {}

export const ListNotification = memo((props: Props) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState({
    ...defaultPaginate,
    search: '',
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const { actions } = useNotificationSlice();
  const { actions: modalActions } = useModalSlice();

  const listNotification = useSelector(selectNotification);
  const loading = useSelector(selectLoading);

  const onEdit = useCallback(
    cell => {
      const {
        data,
        row: { index },
      } = cell;
      const id = data[index]._id;
      history.push(`/notification-system/${id}`);
    },
    [history],
  );

  const onDelete = useCallback(
    async cell => {
      const {
        data,
        row: { index },
      } = cell;
      const _id = data[index]._id;
      dispatch(
        modalActions.showConfirmModal({
          title: '확인',
          description: '삭제 하시겠습니까?',
          onYes: () => {
            dispatch(actions.deleteNotification({ _id, filter }));
          },
          onNo: () => {
            dispatch(modalActions.showConfirmModal(false));
          },
        }),
      );
    },
    [actions, dispatch, filter, modalActions],
  );

  const onSetPriority = useCallback(
    cell => {
      const {
        data,
        row: { index },
      } = cell;
      const id = data[index]._id;
      dispatch(actions.setPriority({ id, filter }));
    },
    [actions, dispatch, filter],
  );

  const columns = useMemo(
    () => [
      {
        Header: '순번',
        accessor: 'stt',
        Cell: cell => (
          <NumberColumn cell={cell} pageNumber={listNotification} />
        ),
      },
      {
        Header: '제목',
        accessor: 'title',
      },
      {
        Header: '내용',
        accessor: 'description',
      },
      {
        Header: '등록일자',
        accessor: 'createdAt',
        Cell: cell => <DateTime data={cell.cell.value} />,
      },
      {
        Header: '보기/좋아요/댓글 수',
        accessor: 'effect',
        Cell: cell => <RenderEffect cell={cell} />,
      },
      {
        Header: '액션',
        accessor: 'actions',
        Cell: cell => (
          <Action
            cell={cell}
            onEdit={() => onEdit(cell)}
            onDelete={() => onDelete(cell)}
            onSetPriority={() => onSetPriority(cell)}
          />
        ),
      },
    ],
    [listNotification, onDelete, onEdit, onSetPriority],
  );

  useEffect(() => {
    dispatch(actions.getListNotification(filter));
  }, [actions, dispatch, filter]);

  const onRegisNotification = useCallback(() => {
    history.push(`/notification-system/add`);
  }, [history]);

  const handlePageChange = useCallback(
    pageNumber => {
      setFilter({
        ...filter,
        page: pageNumber,
      });
    },
    [filter],
  );

  const fetchDataSearch = useCallback(
    value => {
      setFilter({
        ...filter,
        search: value,
      });
    },
    [filter],
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
    <>
      {loading && <FesLoading />}
      <Div>
        <Title>{t('공지 사항 관리')}</Title>
        <Row>
          <Col sm={12} className="text-right pb-4">
            <Button
              style={{ backgroundColor: '#2A4365' }}
              onClick={onRegisNotification}
            >
              {'공지 사항 등록'}
            </Button>
          </Col>
          <Col sm={6} className="pb-5 d-flex align-items-center">
            <FesInput
              placeholder="공지 사항의 제목으로 검색"
              onChange={handleSearch}
            />
            <span className="display-icon">
              <SearchIcon />
            </span>
          </Col>
          <Col sm={12}>
            <FesTable
              data={listNotification.results}
              columns={columns}
              paginateData={listNotification}
              handlePageChange={pageNumber => handlePageChange(pageNumber - 1)}
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

  padding-top: 1.5rem;
`;
