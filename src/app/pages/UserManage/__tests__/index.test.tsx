import * as React from 'react';
import { render } from '@testing-library/react';

import { UserManage } from '..';

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

describe('<UserManage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<UserManage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
