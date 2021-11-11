/**
 *
 * ConfirmModal
 *
 */
import React, { memo, useCallback } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { FesModal } from 'app/components/FesModal/Loadable';
import { useModalSlice } from 'app/pages/Modal/slice';
import { selectShowConfirm } from 'app/pages/Modal/slice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ModalBody } from 'reactstrap';

interface Props {
  title?: string;
  description?: string;
  onYes?: any;
  onNo?: any;
}

export const ConfirmModal = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { actions } = useModalSlice();
  const dispatch = useDispatch();
  const showConfirm = useSelector(selectShowConfirm);

  const onClose = useCallback(() => {
    dispatch(actions.showConfirmModal(!showConfirm));
  }, [actions, dispatch, showConfirm]);

  const handleOnYesClick = useCallback(() => {
    onClose();
    props.onYes();
  }, [onClose, props]);

  return (
    <Div>
      <FesModal
        isOpen
        title={props.title}
        onToggle={onClose}
        footer={
          <>
            <Button color="primary" onClick={handleOnYesClick}>
              확인
            </Button>{' '}
            <Button color="secondary" onClick={props.onNo}>
              취소
            </Button>
          </>
        }
      >
        <ModalBody>
          <span>{props.description}</span>
        </ModalBody>
      </FesModal>
    </Div>
  );
});

const Div = styled.div``;
