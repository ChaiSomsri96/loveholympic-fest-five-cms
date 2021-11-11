/**
 *
 * SetBodySmsModal
 *
 */
import { FesModal } from 'app/components/FesModal/Loadable';
import { FesErrorMessage } from 'app/components/Forms';
import { addSettingSMSValidator } from 'app/pages/Modal/screens/SetBodySmsModal/validator';
import { useModalSlice } from 'app/pages/Modal/slice';
import { selectShowSettingSendSMS } from 'app/pages/Modal/slice/selectors';
import { useUsercodeSlice } from 'app/pages/UserCodeManage/slice';
import { selectSettingSMS } from 'app/pages/UserCodeManage/slice/selectors';
import { Form, Formik } from 'formik';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import styled from 'styled-components/macro';
import DatePicker from 'react-datepicker';

interface Props {}

export const SetBodySmsModal = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useModalSlice();
  const { actions: userCodeActions } = useUsercodeSlice();

  const [timeSend, setTimeSend] = useState(new Date());
  const showSettingSendSMS = useSelector(selectShowSettingSendSMS);
  const settingSMSData = useSelector(selectSettingSMS);
  console.log({ settingSMSData });

  const onToggle = useCallback(() => {
    dispatch(actions.showSettingSendSMSModal(!showSettingSendSMS));
  }, [actions, dispatch, showSettingSendSMS]);

  useEffect(() => {
    dispatch(userCodeActions.getSettingSMS({}));
  }, [dispatch, userCodeActions]);

  const onSave = useCallback(
    values => {
      dispatch(userCodeActions.createSettingSMS(values));
    },
    [dispatch, userCodeActions],
  );

  return (
    <Div>
      <FesModal isOpen title="SMS내용설정" onToggle={onToggle}>
        <Formik
          initialValues={{
            smsContent:
              settingSMSData && settingSMSData.smsContent
                ? settingSMSData.smsContent
                : '',
            timeSend:
              settingSMSData && settingSMSData.timeSend
                ? new Date(settingSMSData.timeSend)
                : new Date(),
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
                  <Label>{t('SMS내용')}</Label>
                  <IconStart>*</IconStart>
                  <Input
                    placeholder="함유량"
                    onChange={handleChange}
                    value={values.smsContent}
                    name="smsContent"
                    type="textarea"
                    style={{ height: '185px' }}
                  />
                  {errors.smsContent && <FesErrorMessage name="smsContent" />}
                </Col>
              </Row>

              <Row>
                <Col>
                  <Label>{t('SMS 발송 시간 설정')}</Label>
                  <IconStart>*</IconStart>
                  <DatePicker
                    selected={values.timeSend}
                    onChange={date => setFieldValue('timeSend', date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    name="timeSend"
                    dateFormat="yyyy-MM-dd HH:mm"
                    value={values.timeSend}
                  />
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
