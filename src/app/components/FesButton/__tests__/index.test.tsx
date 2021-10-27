import * as React from 'react';
import { render } from '@testing-library/react';

import { FesButton } from '..';

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

describe('<FesButton  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <FesButton style={{}} title="" onClick={() => {}} icon={<></>} />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
