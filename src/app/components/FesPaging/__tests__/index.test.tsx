import * as React from 'react';
import { render } from '@testing-library/react';

import { FesPaging } from '..';

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

describe('<FesPaging  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<FesPaging />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
