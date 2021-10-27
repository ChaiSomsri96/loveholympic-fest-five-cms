import * as React from 'react';
import { render } from '@testing-library/react';

import { Logo } from '..';

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

describe('<Logo  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Logo />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
