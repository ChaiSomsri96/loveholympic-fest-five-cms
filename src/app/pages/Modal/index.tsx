/**
 *
 * Modal
 *
 */
import {
  SetBodySmsModal,
  ConfirmModal,
  SetSmsUserModal,
} from 'app/pages/Modal/screens';
import {
  selectShowSettingSendSMS,
  selectShowConfirm,
  selectShowSettingSmsUser,
} from 'app/pages/Modal/slice/selectors';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface Props {}

export const Modal = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const showSettingSendSMS = useSelector(selectShowSettingSendSMS);
  const showConfirm = useSelector(selectShowConfirm);
  const showSettingSmsUser = useSelector(selectShowSettingSmsUser);

  return (
    <>
      {!!showConfirm && (
        <ConfirmModal
          onYes={showConfirm.onYes}
          onNo={showConfirm.onNo}
          title={showConfirm.title}
          description={showConfirm.description}
        />
      )}
      {!!showSettingSendSMS && <SetBodySmsModal />}
      {!!showSettingSmsUser && (
        <SetSmsUserModal
          initValues={
            typeof showSettingSmsUser === 'boolean' ? {} : showSettingSmsUser
          }
        />
      )}
    </>
  );
});
