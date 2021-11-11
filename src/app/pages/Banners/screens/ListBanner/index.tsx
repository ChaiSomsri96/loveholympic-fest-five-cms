/**
 *
 * ListBanner
 *
 */
import { FesTable } from 'app/components/FesTable/Loadable';
import { useBannerSlice } from 'app/pages/Banners/slice';
import { selectBannerPaginate } from 'app/pages/Banners/slice/selectors';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import queryString from 'query-string';
import { defaultPaginate } from 'app/config/filter';
import {
  No as NumberColumn,
  Image,
  Active,
  DateTime,
  FesAction as Action,
} from 'app/components/RenderColumns';
import { Button, Col, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';

interface Props {}

export const ListBanner = memo((props: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { actions } = useBannerSlice();
  const bannerPaginate = useSelector(selectBannerPaginate);
  const [filter, setFilter] = useState(defaultPaginate);

  const onEdit = useCallback(
    cell => {
      const {
        data,
        row: { index },
      } = cell;
      const id = data[index]._id;
      history.push(`/banners/${id}`);
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
      dispatch(actions.deleteBanner(_id));
    },
    [actions, dispatch],
  );

  const onSetPriority = useCallback(
    cell => {
      history.push(`notification-system/?limit=${10}`);
    },
    [history],
  );

  const columns = useMemo(() => {
    return [
      {
        Header: '순번',
        accessor: 'no',
        Cell: cell => <NumberColumn cell={cell} pageNumber={bannerPaginate} />,
      },
      {
        Header: '이미지',
        accessor: 'image',
        Cell: cell => <Image url={cell.cell.value} />,
      },
      {
        Header: '내용',
        accessor: 'description',
      },
      {
        Header: '상태',
        accessor: 'isActive',
        Cell: cell => <Active isActive={cell.cell.value} />,
      },
      {
        Header: '위치',
        accessor: 'type',
        Cell: ({ cell }) => {
          return <span>{cell.value === 'top' ? 'Home' : 'Profile'}</span>;
        },
      },
      {
        Header: '등록일자',
        accessor: 'createdAt',
        Cell: cell => <DateTime data={cell.cell.value} />,
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
    ];
  }, [bannerPaginate, onDelete, onEdit, onSetPriority]);

  useEffect(() => {
    dispatch(actions.getListBanner(queryString.stringify(filter)));
  }, [actions, dispatch, filter]);

  const handlePageChange = useCallback(
    currentPage => {
      setFilter({
        ...filter,
        page: currentPage,
      });
    },
    [filter],
  );

  const onAddBanner = useCallback(() => {
    history.push('/banners/add');
  }, [history]);

  return (
    <Div>
      <Title>배너</Title>
      <Row>
        <Col sm={12} className="text-right pb-4">
          <Button color="primary" onClick={onAddBanner}>
            {'배너 추가 '}
          </Button>
        </Col>
        <Col sm={12}>
          <FesTable
            columns={columns}
            data={bannerPaginate.results}
            handlePageChange={currentPage => handlePageChange(currentPage - 1)}
            paginateData={bannerPaginate}
          />
        </Col>
      </Row>
    </Div>
  );
});

const Div = styled.div`
  background-color: #ecf0f5;
  height: 100%;
  padding: 1rem;
`;

const Title = styled.p`
  color: #2c5282;
  font-family: Roboto;
  font-size: 24px;
  font-weight: bold;

  padding-top: 1.5rem;
`;
