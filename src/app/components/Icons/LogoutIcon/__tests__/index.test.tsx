import * as React from 'react';
import { render } from '@testing-library/react';

import { LogoutIcon } from '..';

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

describe('<LogoutIcon  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<LogoutIcon />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
