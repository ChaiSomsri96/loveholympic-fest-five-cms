import * as React from 'react';
import { render } from '@testing-library/react';

import { ErrManage } from '..';

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

describe('<ErrManage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ErrManage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
