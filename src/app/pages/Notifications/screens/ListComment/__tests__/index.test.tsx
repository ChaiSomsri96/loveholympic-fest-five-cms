import * as React from 'react';
import { render } from '@testing-library/react';

import { ListComment } from '..';

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

describe('<ListComment  />', () => {
  it('should match snapshot', (props: any) => {
    const loadingIndicator = render(<ListComment {...props} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
