import * as React from 'react';
import { render } from '@testing-library/react';

import { FesDatePicker } from '..';

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

describe('<FesDatePicker  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<FesDatePicker />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
