import * as React from 'react';
import { render } from '@testing-library/react';

import { ImageManage } from '..';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('<ImangeManage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ImageManage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
