/**
 *
 * FesLoading
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { Spinner } from 'reactstrap';

interface Props {}

export const FesLoading = memo((props: Props) => {
  return (
    <Loader className="overlay">
      <Spinner color="primary" />
    </Loader>
  );
});

const Loader = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: black center center no-repeat;
  opacity: 0.5;

  div {
    position: fixed;
    top: 50%;
    left: 50%;
  }
`;
