import { fireEvent, render } from '@testing-library/react';

import { useSortableTableContext } from '../use-sortable-table-context';

import Header from './Header';

jest.mock('../use-sortable-table-context');

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
    order: given.order,
    orderBy: 'id',
    setOrder,
    setOrderBy,
  }));

  const renderHeader = () => render((
    <table>
      <Header />
    </table>
  ));

  context('when label is clicked', () => {
    it('changes orderBy to column id', () => {
      const { getByRole } = renderHeader();

      fireEvent.click(getByRole('button', { name: 'label' }));

      expect(setOrderBy).toBeCalledWith('id');
    });

    context('with ascending order', () => {
      it('changes order to descending', () => {
        given('order', () => 'asc');

        const { getByRole } = renderHeader();

        fireEvent.click(getByRole('button', { name: 'label' }));

        expect(setOrder).toBeCalledWith('desc');
      });
    });

    context('with descending order', () => {
      it('changes order to ascending', () => {
        given('order', () => 'desc');

        const { getByRole } = renderHeader();

        fireEvent.click(getByRole('button', { name: 'label' }));

        expect(setOrder).toBeCalledWith('asc');
      });
    });
  });
});
