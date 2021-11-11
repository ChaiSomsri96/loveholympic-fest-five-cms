import * as React from 'react';
import { render } from '@testing-library/react';

import { ListBanner } from '..';

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

describe('<ListBanner  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ListBanner />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
