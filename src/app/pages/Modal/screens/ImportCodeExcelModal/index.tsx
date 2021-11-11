/**
 *
 * ImportCodeExcelModal
 *
 */
import { FesModal } from 'app/components/FesModal/Loadable';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

interface Props {}

export const ImportCodeExcelModal = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const onToggle = useCallback(() => {
    // dispatch(modalActions.showAddEditAccountModal(!showAddEditAccount));
  }, []);

  return (
    <Div>
      <FesModal isOpen title="Import Code Excel" onToggle={onToggle}>
        <h2>Hello Modal</h2>
      </FesModal>
    </Div>
  );
});

const Div = styled.div``;
