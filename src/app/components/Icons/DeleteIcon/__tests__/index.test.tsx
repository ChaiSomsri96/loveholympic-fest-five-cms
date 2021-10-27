import * as React from 'react';
import { render } from '@testing-library/react';

import { DeleteIcon } from '..';

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

describe('<DeleteIcon  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<DeleteIcon />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
