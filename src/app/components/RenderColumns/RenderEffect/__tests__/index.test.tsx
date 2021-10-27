import * as React from 'react';
import { render } from '@testing-library/react';

import { RenderEffect } from '..';

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

describe('<RenderEffect  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<RenderEffect cell={null} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
