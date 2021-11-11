import * as React from 'react';
import { render } from '@testing-library/react';

import { SetSmsUserModal } from '..';

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

describe('<SetSmsUserModal  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<SetSmsUserModal />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
