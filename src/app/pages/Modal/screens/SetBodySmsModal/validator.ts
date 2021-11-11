import * as Yup from 'yup';

const addSettingSMSValidator = Yup.object({
  smsContent: Yup.string().required('SMS 내용'),
  // timeSend: Yup.string().required('timeSend'),
});

export { addSettingSMSValidator };
