import React from 'react';

import { render } from '@testing-library/react';

import MockConsole, { RestoreConsole } from 'jest-mock-console';

import AsyncBoundary from './AsyncBoundary';

describe('AsyncBoundary', () => {
  const pendingMessage = '로딩 중';
  const rejectedMessage = '에러 발생';

  const renderAsyncBoundary = (children: React.ReactNode) => render((
    <AsyncBoundary
      pendingFallback={<p>{pendingMessage}</p>}
      rejectedFallback={() => <p>{rejectedMessage}</p>}
    >
      {children}
    </AsyncBoundary>
  ));

  context('with pending children', () => {
    const Pending = () => {
      throw new Promise(() => {});
    };

    it('renders pending fallback', () => {
      const { container } = renderAsyncBoundary(<Pending />);

      expect(container).toHaveTextContent(pendingMessage);
    });
  });

  context('with rejected children', () => {
    let restoreConsole : RestoreConsole;

    beforeAll(() => {
      restoreConsole = MockConsole();
    });

    afterAll(() => {
      restoreConsole();
    });

    const Rejected = () => {
      throw Error();
    };

    it('renders rejected fallback', () => {
      const { container } = renderAsyncBoundary(<Rejected />);

      expect(container).toHaveTextContent(rejectedMessage);
    });
  });
});
