/**
 *
 * FesFileUpload
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
interface Props {
  children?: any;
  onChangeFile?: any;
  fileRef?: any;
  name?: string;
  accept?: string;
}

export const FesFileUpload = memo((props: Props) => {
  const { children, onChangeFile, fileRef, name, accept } = props;

  return (
    <>
      <FileInput
        ref={fileRef}
        type="file"
        onChange={evt => onChangeFile(evt)}
        name={name}
        accept={accept ? accept : ''}
      />
      {children}
    </>
  );
});

const FileInput = styled.input`
  display: none;
`;
