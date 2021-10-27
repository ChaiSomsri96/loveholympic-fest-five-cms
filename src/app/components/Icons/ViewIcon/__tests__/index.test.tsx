import * as React from 'react';
import { render } from '@testing-library/react';

import { ViewIcon } from '..';

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

describe('<ViewIcon  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ViewIcon />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
