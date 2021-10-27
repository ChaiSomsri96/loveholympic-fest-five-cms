import * as React from 'react';
import { render } from '@testing-library/react';

import { FesInput } from '..';

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

describe('<FesInput  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<FesInput />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
