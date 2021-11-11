import * as Yup from 'yup';

const addSettingSMSValidator = Yup.object({
  smsContentUser: Yup.string().required('SMS 내용'),
});

export { addSettingSMSValidator };
