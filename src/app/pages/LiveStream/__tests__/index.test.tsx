import * as React from 'react';
import { render } from '@testing-library/react';

import { LiveStream } from '..';

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

describe('<LiveStream  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<LiveStream />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
