/**
 *
 * Results
 *
 */
import styled from 'styled-components/macro';
import FileDownload from 'js-file-download';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { FesTable } from 'app/components/FesTable';
import { FesTypography } from 'app/components/FesTypography/Loadable';
import { formatDate } from 'app/constants';
import { useGoldenTicketSlice } from 'app/pages/GoldenTicket/slice';
import { selectResultTicket } from 'app/pages/GoldenTicket/slice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardHeader, Col, Row } from 'reactstrap';
import { defaultPaginate } from 'app/config/filter';
import { ExportIcon } from 'app/components/Icons';
import { exportData } from 'services/goldenTicket';
interface Props {
  start: any;
  end: any;
}

export const Results = memo((props: Props) => {
  const { actions } = useGoldenTicketSlice();
  const dispatch = useDispatch();
  const ticketResults = useSelector(selectResultTicket);
  const start = formatDate(props.start);
  const end = formatDate(props.end);
  // const [dataExport, setDataExport] = useState([]);
  const [filter, setFilter] = useState(defaultPaginate);

  const columns = useMemo(
    () => [
      {
        Header: '등수',
        accessor: 'goldenTicket.name',
        // Cell: ({ cell }) => cell.value?.name,
      },
      {
        Header: '사용자명',
        accessor: 'user.nickname',
      },
      {
        Header: '전화번호',
        accessor: 'user.phone',
      },
      {
        Header: '당첨코드',
        accessor: 'user.code',
      },
      {
        Header: '분류',
        accessor: 'type',
        Cell: ({ cell }) => {
          return cell.value === 'default' ? '지정' : '랜덤';
        },
      },
    ],
    [],
  );

  useEffect(() => {
    dispatch(actions.getResultTicket(filter));
  }, [actions, dispatch, filter]);

  /**
  useEffect(() => {
    if (ticketResults.results.length) {
      const dataExport = [] as any;
      ticketResults.results.map(ticket => {
        const item = {
          등수: _.get(ticket, 'goldenTicket.name'),
          사용자명: _.get(ticket, 'user.nickname'),
          전화번호: _.get(ticket, 'user.phone'),
          당첨코드: _.get(ticket, 'user.code'),
          분류: _.get(ticket, 'type') === 'default' ? '지정' : '랜덤',
        };
        dataExport.push(item);
        return ticket;
      });
      setDataExport(dataExport);
    }
  }, [ticketResults]);
  */

  const handlePageChange = useCallback(
    pageNumber => {
      setFilter({
        ...filter,
        page: pageNumber,
      });
    },
    [filter],
  );

  const exportDataToCsv = useCallback(async () => {
    const response = await exportData('golden-ticket/export-userlucky');
    FileDownload(response, '당첨 결과 리스트.xlsx');
  }, []);

  return (
    <Row>
      <Col sm={12} className="pb-2 text-right pr-5">
        <Button color="success" onClick={exportDataToCsv}>
          <ExportIcon />
          <span style={{ marginLeft: '10px' }}>엑셀 다운로드</span>
        </Button>
      </Col>
      <Card>
        <CardHeader>
          <Col sm={12} className="d-flex pl-5 pr-5">
            <div className="pr-5">
              <FesTypography title="시상 시작 일시" />
              <Span>{start}</Span>
            </div>
            <div>
              <FesTypography title="시상 마감 일시" />
              <Span>{end}</Span>
            </div>
          </Col>
        </CardHeader>
        <WrapBody>
          <Col sm={12}>
            <FesTable
              columns={columns}
              data={ticketResults.results}
              paginateData={ticketResults}
              handlePageChange={pageNumber => handlePageChange(pageNumber - 1)}
            />
          </Col>
        </WrapBody>
      </Card>
    </Row>
  );
});

const WrapBody = styled(Row)`
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const Span = styled.span`
  color: #2c5282;
  margin: 0 0.5rem 0 1rem;
  font-size: 14px;
`;
