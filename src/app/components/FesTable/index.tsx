/**
 *
 * FesTable
 *
 */
import { FesPaging } from 'app/components/FesPaging/Loadable';
import React, { memo } from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components/macro';
interface Props {
  columns?: any;
  data?: any;
  handlePageChange?: any;
  onClickRow?: any;
  paginateData?: any;
}

export const FesTable = memo(
  ({ columns, data, handlePageChange, onClickRow, paginateData }: Props) => {
    const tableInstance = useTable({
      columns,
      data,
    });

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      rows,
    } = tableInstance;

    return (
      <Div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        onClick={
                          onClickRow && (() => onClickRow(cell.row.original))
                        }
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {!data.length && <div>No data</div>}
        {/* Paging */}
        {paginateData.total / paginateData.limit > 1 && (
          <FesPaging
            paginateData={paginateData}
            handlePageChange={handlePageChange}
          />
        )}
      </Div>
    );
  },
);

const Div = styled.div`
  table {
    border-collapse: separate;
    table-layout: fixed;

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      color: #2c5282;

      /* text-overflow: ellipsis; */
      /* overflow: hidden; */
      /* white-space: nowrap; */
    }

    thead {
      display: table;
      table-layout: fixed;
      width: 100%;
      border-bottom: 1px solid #94989d;

      /* text-align: center; */

      th:nth-child(1) {
        width: 100px;
      }
    }

    tbody {
      display: table;
      table-layout: fixed;
      width: 100%;
      border-spacing: 0 10px;

      /* text-align: center; */

      tr {
        background: #dce5ed;

        td {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        td:nth-child(1) {
          width: 100px;
        }
      }
    }
  }
`;
