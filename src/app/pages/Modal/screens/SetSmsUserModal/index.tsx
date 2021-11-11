/**
 *
 * SetBodySmsModal
 *
 */
import { FesModal } from 'app/components/FesModal/Loadable';
import { FesErrorMessage } from 'app/components/Forms';
import { addSettingSMSValidator } from 'app/pages/Modal/screens/SetSmsUserModal/validator';
import { useModalSlice } from 'app/pages/Modal/slice';
import { selectShowSettingSmsUser } from 'app/pages/Modal/slice/selectors';
import { useUsercodeSlice } from 'app/pages/UserCodeManage/slice';
import { selectSettingSMS } from 'app/pages/UserCodeManage/slice/selectors';
import { Form, Formik } from 'formik';
import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import styled from 'styled-components/macro';

interface Props {
  initValues?: any;
}

export const SetSmsUserModal = memo(({ initValues }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useModalSlice();
  const { actions: userCodeActions } = useUsercodeSlice();

  const showSettingSmsUser = useSelector(selectShowSettingSmsUser);
  const settingSMSData = useSelector(selectSettingSMS);

  const onToggle = useCallback(() => {
    dispatch(actions.showSettingSmsUserModal(!showSettingSmsUser));
  }, [actions, dispatch, showSettingSmsUser]);

  useEffect(() => {
    dispatch(userCodeActions.getSettingSMS({}));
  }, [dispatch, userCodeActions]);

  const onSave = useCallback(
    values => {
      dispatch(
        userCodeActions.sendUserSms({
          ...values,
          users: initValues,
        }),
      );
    },
    [dispatch, initValues, userCodeActions],
  );

  return (
    <Div>
      <FesModal isOpen title="SMS내용설정" onToggle={onToggle}>
        <Formik
          initialValues={{
            smsContentUser:
              settingSMSData && settingSMSData.smsContentUser
                ? settingSMSData.smsContentUser
                : '',
          }}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            onSave(values);
            setSubmitting(false);
          }}
          validationSchema={addSettingSMSValidator}
        >
          {({ values, errors, handleSubmit, handleChange, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Label>{t('SMS내용 *')}</Label>
                  <IconStart>*</IconStart>
                  <Input
                    placeholder="함유량"
                    onChange={handleChange}
                    value={values.smsContentUser}
                    name="smsContentUser"
                    type="textarea"
                    style={{ height: '185px' }}
                  />
                  {errors.smsContentUser && (
                    <FesErrorMessage name="smsContentUser" />
                  )}
                </Col>
              </Row>

              <Row>
                <Col sm={12} className="text-center pt-3">
                  <Button
                    onClick={onToggle}
                    type="button"
                    style={{ marginRight: '1rem' }}
                  >
                    {t('이전')}
                  </Button>
                  <Button color="success" type="submit">
                    {t('저장')}
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </FesModal>
    </Div>
  );
});

const Div = styled.div``;

const IconStart = styled.span`
  color: red;
  font-size: 22px;
  margin-left: 3px;
`;
