import * as React from 'react';
import { render } from '@testing-library/react';

import { Results } from '..';

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

describe('<Results  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Results start={null} end={null} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
