/**
 *
 * Authorize
 *
 */
import { FesButton, FesErrorMessage, FesInput } from 'app/components/Forms';
import { LockIcon, Logo, UserIcon } from 'app/components/Icons/index';
import { useAuthorizeSlice } from 'app/pages/Authorize/slice';
import { validationSchema } from 'app/pages/Authorize/validation';
import { Form, Formik, FormikHelpers } from 'formik';
import BgLogin from 'images/auth/BG.png';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Col, Container, InputGroup } from 'reactstrap';
import styled from 'styled-components/macro';

interface Props {}

type Values = {
  username: string;
  password: string;
};

export const Authorize = memo((props: Props) => {
  const { t } = useTranslation();
  const { actions } = useAuthorizeSlice();
  const dispatch = useDispatch();

  return (
    <CustomContainer>
      <Div>
        <WrapBranch>
          <div>
            <P>{t('LOVES')}</P>
            <P className="second-text">{t('HOLYMPIC')}</P>
          </div>
          <WrapLogo>
            <Logo />
          </WrapLogo>
        </WrapBranch>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>,
          ) => {
            const payload = {
              values,
            };
            dispatch(actions.login(payload));
            setSubmitting(false);
          }}
          validationSchema={validationSchema}
        >
          {({ values, errors, handleSubmit, handleChange }) => (
            <>
              <Form onSubmit={handleSubmit} autoComplete="off">
                <Col className="mb-3 mt-2">
                  <InputGroup className="flex-column">
                    <DivGroup>
                      <UserIcon />
                    </DivGroup>
                    <FesInput
                      id="username"
                      name="username"
                      type="text"
                      value={values.username}
                      onChange={handleChange}
                    />
                    {errors.username && <FesErrorMessage name="username" />}
                  </InputGroup>
                </Col>
                <Col className="mb-3 mt-2 ">
                  <InputGroup className="flex-column">
                    <DivGroup>
                      <LockIcon />
                    </DivGroup>
                    <FesInput
                      id="password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    {errors.password && <FesErrorMessage name="password" />}
                  </InputGroup>
                </Col>
                <FesButton title={'로그인'} type="submit" color="primary" />
              </Form>
            </>
          )}
        </Formik>
      </Div>
    </CustomContainer>
  );
});

const Div = styled.div`
  width: 26%;
  @media (max-width: 1024px) {
    width: 80%;
  }
`;

const P = styled.p`
  font-family: Montserrat;
  font-size: 45px;
  font-weight: bold;
  color: #ffffff;
  margin: auto;

  &.second-text {
    margin-left: 30px;
  }
`;

const DivGroup = styled.div`
  position: absolute;
  top: 0.3rem;
  left: 0.5rem;
`;

const CustomContainer = styled(Container)`
  background-color: #455167;
  background-image: url(${BgLogin});
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0;
  max-width: initial;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WrapBranch = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const WrapLogo = styled.div`
  padding-top: 1rem;
`;
