/**
 *
 * FesAction
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { EditIcon, DeleteIcon, ArrowUpIcon } from 'app/components/Icons';

interface Props {
  cell?: any;
  onEdit?: () => void;
  onDelete?: () => void;
  onSetPriority?: () => void;
}

export const FesAction = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { cell, onEdit, onDelete, onSetPriority } = props;

  return (
    <Div>
      <button value={cell.accessor} onClick={onEdit}>
        <EditIcon />
      </button>
      <button value={cell.accessor} onClick={onDelete}>
        <DeleteIcon />
      </button>
      <button value={cell.accessor} onClick={onSetPriority}>
        <ArrowUpIcon />
      </button>
    </Div>
  );
});

const Div = styled.div`
  button {
    border: none;
    background-color: #dce5ed;
  }
`;
