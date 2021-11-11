import * as React from 'react';
import { render } from '@testing-library/react';

import { Notifications } from '..';

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

describe('<Notifications  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Notifications match={null} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
