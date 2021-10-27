import * as React from 'react';
import { render } from '@testing-library/react';

import { SettingIcon } from '..';

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

describe('<SettingIcon  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<SettingIcon />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
