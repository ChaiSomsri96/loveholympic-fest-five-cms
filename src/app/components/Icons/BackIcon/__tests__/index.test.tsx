import * as React from 'react';
import { render } from '@testing-library/react';

import { BackIcon } from '..';

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

describe('<BackIcon  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<BackIcon />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
