import * as React from 'react';
import { render } from '@testing-library/react';

import { FesAction } from '..';

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

describe('<FesAction  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<FesAction />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
