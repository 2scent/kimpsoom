import { fireEvent, render } from '@testing-library/react';

import { useSortableTableContext } from '../useSortableTableContext';

import Header from './Header';

jest.mock('../useSortableTableContext');

describe('SortableTable.Header', () => {
  const columns = [
    {
      id: 'id',
      label: 'label',
    },
  ];

  const setOrder = jest.fn();
  const setOrderBy = jest.fn();

  (useSortableTableContext as jest.Mock).mockImplementation(() => ({
    columns,
    setOrder,
    setOrderBy,
  }));

  const renderHeader = () => render((
    <table>
      <Header />
    </table>
  ));

  it('listens label click event', () => {
    const { getByRole } = renderHeader();

    fireEvent.click(getByRole('button', { name: 'label' }));

    expect(setOrder).toBeCalled();
    expect(setOrderBy).toBeCalled();
  });
});
