import * as React from 'react';
import { render } from '@testing-library/react';

import { EditIcon } from '..';

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

describe('<EditIcon  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<EditIcon />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
