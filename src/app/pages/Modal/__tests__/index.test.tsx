import * as React from 'react';
import { render } from '@testing-library/react';

import { Modal } from '..';

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

describe('<Modal  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Modal />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
