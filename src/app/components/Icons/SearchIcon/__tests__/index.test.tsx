import * as React from 'react';
import { render } from '@testing-library/react';

import { SearchIcon } from '..';

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

describe('<SearchIcon  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<SearchIcon />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
