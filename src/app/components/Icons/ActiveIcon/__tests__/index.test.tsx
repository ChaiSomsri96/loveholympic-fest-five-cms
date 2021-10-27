import * as React from 'react';
import { render } from '@testing-library/react';

import { ActiveIcon } from '..';

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

describe('<ActiveIcon  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ActiveIcon />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
