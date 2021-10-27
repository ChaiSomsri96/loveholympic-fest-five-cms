import * as React from 'react';
import { render } from '@testing-library/react';

import { LocationIcon } from '..';

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

describe('<LocationIcon  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<LocationIcon />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
