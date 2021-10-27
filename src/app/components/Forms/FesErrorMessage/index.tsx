/**
 *
 * FesErrorMessage
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from 'formik';

interface Props {
  name?: string;
}

export const FesErrorMessage = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { name } = props;

  return (
    <div style={{ color: 'red' }}>
      <ErrorMessage name={name || ''} />
    </div>
  );
});
