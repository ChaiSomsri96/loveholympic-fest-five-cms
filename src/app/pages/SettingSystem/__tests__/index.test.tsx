import * as React from 'react';
import { render } from '@testing-library/react';

import { SettingSystem } from '..';

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

describe('<SettingSystem  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<SettingSystem />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
