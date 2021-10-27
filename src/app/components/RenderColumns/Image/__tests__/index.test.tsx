import * as React from 'react';
import { render } from '@testing-library/react';

import { Image } from '..';

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

describe('<Image  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Image />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
