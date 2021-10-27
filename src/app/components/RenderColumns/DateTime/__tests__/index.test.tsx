import * as React from 'react';
import { render } from '@testing-library/react';

import { DateTime } from '..';

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

describe('<DateTime  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<DateTime />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
