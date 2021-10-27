/**
 *
 * FesLoadingImage
 *
 */
import React, { memo } from 'react';
import { Spinner } from 'reactstrap';
import styled from 'styled-components/macro';

interface Props {}

export const FesLoadingImage = memo((props: Props) => {
  return (
    <Div>
      <Spinner color="primary" />
    </Div>
  );
});

const Div = styled.div`
  width: 250px;
  height: 200px;
  align-items: center;
  display: flex;
  justify-content: center;
  background: black;
  opacity: 0.2;
`;
