/**
 *
 * Image
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';

interface Props {
  url?: string;
}

export const Image = memo(({ url }: Props) => {
  return (
    <Div>
      <img src={url || ''} alt="" />
    </Div>
  );
});

const Div = styled.div`
  img {
    height: 100px;
    width: 150px;
  }
`;
