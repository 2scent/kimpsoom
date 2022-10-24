import userEvent from '@testing-library/user-event';

import { render } from '@testing-library/react';

import TickerButton from './TickerButton';

describe('TickerButton', () => {
  const ticker = 'BTC';
  const handleClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderTickerButton = () => render((
    <TickerButton
      ticker={ticker}
      selected={given.selected}
      onClick={handleClick}
    />
  ));

  it('renders ticker', () => {
    const { container } = renderTickerButton();

    expect(container).toHaveTextContent(ticker);
  });

  it('listens click event', async () => {
    const user = userEvent.setup();
    const { getByRole } = renderTickerButton();

    await user.click(getByRole('button', { name: ticker }));

    expect(handleClick).toBeCalledWith(ticker);
  });

  context('when selected', () => {
    given('selected', () => true);

    it('renders contained button', () => {
      const { container } = renderTickerButton();

      expect(container.firstChild).toHaveClass('MuiButton-contained');
    });
  });

  context('when unselected', () => {
    given('selected', () => false);

    it('renders outlined button', () => {
      const { container } = renderTickerButton();

      expect(container.firstChild).toHaveClass('MuiButton-outlined');
    });
  });
});
