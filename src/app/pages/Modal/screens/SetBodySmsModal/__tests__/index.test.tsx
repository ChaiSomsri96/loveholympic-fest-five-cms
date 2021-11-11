import * as React from 'react';
import { render } from '@testing-library/react';

import { SetBodySmsModal } from '..';

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

describe('<SetBodySmsModal  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<SetBodySmsModal />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
