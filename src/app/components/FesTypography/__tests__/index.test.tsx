import * as React from 'react';
import { render } from '@testing-library/react';

import { FesTypography } from '..';

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

describe('<FesTypography  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<FesTypography />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
