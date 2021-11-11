import * as React from 'react';
import { render } from '@testing-library/react';

import { Dashboard } from '..';

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

describe('<Dashboard  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Dashboard />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
