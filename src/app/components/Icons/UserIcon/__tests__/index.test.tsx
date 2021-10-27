import * as React from 'react';
import { render } from '@testing-library/react';

import { UserIcon } from '..';

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

describe('<UserIcon  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<UserIcon />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
