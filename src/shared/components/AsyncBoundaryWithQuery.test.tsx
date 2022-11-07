import React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MockConsole, { RestoreConsole } from 'jest-mock-console';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { FallbackProps } from 'react-error-boundary';

import AsyncBoundaryWithQuery from './AsyncBoundaryWithQuery';

jest.mock('@tanstack/react-query');

describe('AsyncBoundaryWithQuery', () => {
  const reset = jest.fn();

  const pendingMessage = '로딩 중';
  const rejectedMessage = '에러 발생';

  beforeAll(() => {
    (useQueryErrorResetBoundary as jest.Mock).mockReturnValue({ reset });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function RejectedFallback({ error, resetErrorBoundary }: FallbackProps) {
    return (
      <>
        <p>{error.message}</p>
        <button
          type="button"
          onClick={resetErrorBoundary}
        >
          {rejectedMessage}
        </button>
      </>
    );
  }

  const renderAsyncBoundaryWithQuery = (children: React.ReactNode) => render((
    <AsyncBoundaryWithQuery
      pendingFallback={<p>{pendingMessage}</p>}
      rejectedFallback={(props) => <RejectedFallback {...props} />}
    >
      {children}
    </AsyncBoundaryWithQuery>
  ));

  context('with pending children', () => {
    const Pending = () => {
      throw new Promise(() => {});
    };

    it('renders pending fallback', () => {
      const { container } = renderAsyncBoundaryWithQuery(<Pending />);

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

    const errorMessage = '에러 메세지';

    const Rejected = () => {
      throw Error(errorMessage);
    };

    it('renders rejected fallback', () => {
      const { container } = renderAsyncBoundaryWithQuery(<Rejected />);

      expect(container).toHaveTextContent(rejectedMessage);
    });

    it('passes error object to rejected fallback', () => {
      const { container } = renderAsyncBoundaryWithQuery(<Rejected />);

      expect(container).toHaveTextContent(errorMessage);
    });

    it('passes reset function of react query to rejected fallback', async () => {
      const user = userEvent.setup();
      const { getByRole } = renderAsyncBoundaryWithQuery(<Rejected />);

      await user.click(getByRole('button', { name: rejectedMessage }));

      expect(reset).toBeCalled();
    });
  });
});
