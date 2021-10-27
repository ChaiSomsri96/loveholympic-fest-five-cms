import * as React from 'react';
import { render } from '@testing-library/react';

import { ExportIcon } from '..';

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

describe('<ExportIcon  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ExportIcon />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
