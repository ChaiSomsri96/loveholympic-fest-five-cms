import * as React from 'react';
import { render } from '@testing-library/react';

import { Header } from '..';

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

describe('<Header  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Header />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
