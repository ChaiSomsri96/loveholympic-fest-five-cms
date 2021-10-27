import * as React from 'react';
import { render } from '@testing-library/react';

import { ExportExcel } from '..';

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

describe('<ExportExcel  />', () => {
  it('should match snapshot', (props: any) => {
    const loadingIndicator = render(<ExportExcel {...props} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
