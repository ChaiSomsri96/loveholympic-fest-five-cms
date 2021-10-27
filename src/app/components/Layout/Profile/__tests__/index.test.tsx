import * as React from 'react';
import { render } from '@testing-library/react';

import { Profile } from '..';

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

describe('<Profile  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Profile />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
