import * as React from 'react';
import { render } from '@testing-library/react';

import { DetailUser } from '..';

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

describe('<DetailUser  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<DetailUser />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
