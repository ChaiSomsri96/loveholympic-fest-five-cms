/**
 *
 * FesPaging
 *
 */
import React, { memo } from 'react';
import Pagination from 'react-js-pagination';
import styled from 'styled-components/macro';

interface Props {
  paginateData?: any;
  handlePageChange?: any;
}

export const FesPaging = memo((props: Props) => {
  const { paginateData, handlePageChange } = props;

  return (
    <Div>
      <Pagination
        activePage={paginateData.page + 1}
        itemsCountPerPage={paginateData.limit}
        totalItemsCount={paginateData.total}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass={'paging'}
      />
    </Div>
  );
});

const Div = styled.div`
  display: flex;
  justify-content: center;

  .paging {
    color: red;
    border-radius: 50%;
    background-color: #a0bde5;
    width: 30px;
    height: 30px;
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 0 2px;
  }

  .active {
    background-color: #889097 !important;
  }
`;
