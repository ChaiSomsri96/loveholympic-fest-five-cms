import * as React from 'react';
import { render } from '@testing-library/react';

import { FesSelect } from '..';

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

describe('<FesSelect  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <FesSelect onChange={null} defaultOptions={null} options={null} />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
