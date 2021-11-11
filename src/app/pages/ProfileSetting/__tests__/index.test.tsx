import * as React from 'react';
import { render } from '@testing-library/react';

import { ProfileSetting } from '..';

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

describe('<ProfileSetting  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ProfileSetting />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
