import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().required('사용자 이름이 필요합니다'),
  password: Yup.string().required('현재 비밀번호가 비어있습니다'),
});

const validateProfie = Yup.object({
  passwordCurrent: Yup.string().required('현재 비밀번호가 비어있습니다'),
  password: Yup.string()
    .required('현재 비밀번호가 비어있습니다')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      '글자/숫자/특수 문자를 포함하여 최소 6자 입력해야 합니다',
    )
    .notOneOf(
      [Yup.ref('passwordCurrent'), null],
      ' 신규 비밀번호를 현재 비밀 번호와 다르게 입력하셔야 합니다',
    ),
  passwordConfirmation: Yup.string()
    .required('비밀번호 확인을 입력하세요')
    .oneOf(
      [Yup.ref('password'), null],
      '신규 비밀번호를 현재 비밀 번호와 다르게 입력하셔야 합니다',
    ),
});

export { validationSchema, validateProfie };
