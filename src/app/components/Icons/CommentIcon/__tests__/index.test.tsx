import * as React from 'react';
import { render } from '@testing-library/react';

import { CommentIcon } from '..';

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

describe('<CommentIcon  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<CommentIcon />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
