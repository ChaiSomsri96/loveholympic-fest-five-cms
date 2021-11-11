import * as React from 'react';
import { render } from '@testing-library/react';

import { ListUser } from '..';

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

describe('<ListUser  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ListUser />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
