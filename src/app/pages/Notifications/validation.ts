import * as Yup from 'yup';

const validateNotification = Yup.object({
  title: Yup.string().required('제목을 입력하세요'),
  // name: Yup.string().required('Name is required.'),
  // description: Yup.string().required('내용을 입력하세요'),
});

export { validateNotification };
