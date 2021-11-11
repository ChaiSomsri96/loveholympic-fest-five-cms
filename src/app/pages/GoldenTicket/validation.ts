import * as Yup from 'yup';

const validationTicket = Yup.object({
  name: Yup.string().required('Name prize is required'),
  random: Yup.string().required('Random is required'),
  // users: Yup.array()
  //   .min(1, 'Pick at least 1 tags')
  //   .of(
  //     Yup.object().shape({
  //       label: Yup.string().required(),
  //       value: Yup.string().required(),
  //     }),
  //   ),
});

export { validationTicket };
