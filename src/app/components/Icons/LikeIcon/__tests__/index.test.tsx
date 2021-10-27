import * as React from 'react';
import { render } from '@testing-library/react';

import { LikeIcon } from '..';

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

describe('<LikeIcon  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<LikeIcon />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
