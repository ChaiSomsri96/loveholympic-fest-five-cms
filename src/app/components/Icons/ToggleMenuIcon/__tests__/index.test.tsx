import * as React from 'react';
import { render } from '@testing-library/react';

import { ToggleMenuIcon } from '..';

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

describe('<ToggleMenuIcon  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ToggleMenuIcon />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
