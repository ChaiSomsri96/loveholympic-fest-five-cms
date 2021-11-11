import * as Yup from 'yup';

const validatePasswordCode = Yup.object({
  password: Yup.string().required('현재 비밀번호가 비어있습니다'),
  // codeLivestream: Yup.string().required('현재 비밀번호가 비어있습니다'),
});

export { validatePasswordCode };
