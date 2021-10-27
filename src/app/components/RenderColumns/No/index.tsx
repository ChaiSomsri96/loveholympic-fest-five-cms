/**
 *
 * No
 *
 */
import React, { memo } from 'react';
import star from 'images/icon/star.jpg';
import styled from 'styled-components/macro';
interface Props {
  cell: any;
  pageNumber: any;
}

export const No = memo((props: Props) => {
  const {
    cell,
    pageNumber: { page, limit },
  } = props;
  const order = cell.row.original.order;
  const no = page * limit + cell.row.index + 1;
  return (
    <>
      <span>{no}</span>
      {order && <IconStar src={star} alt="" />}
    </>
  );
});

const IconStar = styled.img`
  width: 25px;
  margin-left: 1rem;
`;
