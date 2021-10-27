import * as React from 'react';
import { render } from '@testing-library/react';

import { UnionIcon } from '..';

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

describe('<UnionIcon  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<UnionIcon />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
