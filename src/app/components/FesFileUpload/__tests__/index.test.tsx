import * as React from 'react';
import { render } from '@testing-library/react';

import { FesFileUpload } from '..';

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

describe('<FesFileUpload  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<FesFileUpload onChangeFile={() => {}} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
