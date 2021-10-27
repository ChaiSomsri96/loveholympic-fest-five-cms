import * as React from 'react';
import { render } from '@testing-library/react';

import { FesLoading } from '..';

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

describe('<FesLoading  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<FesLoading />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
