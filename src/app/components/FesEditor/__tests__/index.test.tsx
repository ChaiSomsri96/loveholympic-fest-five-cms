import * as React from 'react';
import { render } from '@testing-library/react';

import { FesEditor } from '..';

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

describe('<FesEditor  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<FesEditor />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
