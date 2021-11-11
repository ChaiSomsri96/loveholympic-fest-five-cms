import * as React from 'react';
import { render } from '@testing-library/react';

import { Setting } from '..';

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

describe('<Setting  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Setting />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
