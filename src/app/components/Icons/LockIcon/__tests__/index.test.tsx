import * as React from 'react';
import { render } from '@testing-library/react';

import { LockIcon } from '..';

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

describe('<LockIcon  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<LockIcon />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
