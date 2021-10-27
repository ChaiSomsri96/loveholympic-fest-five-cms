import * as React from 'react';
import { render } from '@testing-library/react';

import { PenToolIcon } from '..';

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

describe('<PenToolIcon  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<PenToolIcon />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
