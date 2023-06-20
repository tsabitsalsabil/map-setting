import React from 'react';
import '@testing-library/jest-dom';
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PaginationButton from '../PaginationButton';

/**
 * test case
 * Should render component correctly
 * Should change to some/other page when page number is clicked
 * previous button should be disabled when user try to clicked it
 * Next button should be disabled when can next page set to disabled
 *
 */

describe('Pagination Button Component', () => {
  it('Should render correctly', () => {
    // arrange
    render(<PaginationButton activePage={0} gotoPageFunction={() => {}} nextPage={() => {}} previousPage={() => {}} canNextPage={false} canPreviousPage={false} />);
    const paginationButton = screen.getByRole('button', {
      name: '1',
    });
    const allButtonFromPaginationComponent = screen.getAllByRole('button');
    allButtonFromPaginationComponent.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
    expect(allButtonFromPaginationComponent).toHaveLength(9);
    expect(paginationButton).toBeInTheDocument();

    // action
  });

  it('Should change to some/other page when page number is clicked', () => {
    const onClickNumberHandler = jest.fn();
    render(<PaginationButton activePage={0} gotoPageFunction={onClickNumberHandler} nextPage={() => {}} previousPage={() => {}} canNextPage={false} canPreviousPage={false} />);

    const button = screen.getByRole('button', {
      name: '1',
    });
    fireEvent.click(button);

    expect(onClickNumberHandler).toHaveBeenCalledTimes(1);
    expect(onClickNumberHandler).toBeCalledWith(0);
  });

  it('previous button should be disabled when user try to clicked it', () => {
    render(<PaginationButton
      activePage={0}
      gotoPageFunction={() => {}}
      nextPage={() => {}}
      previousPage={() => {}}
      canNextPage={false}
      canPreviousPage={false}
    />);
    const previousButtonToBeDisabled = screen.getByRole('button', {
      name: 'Previous',
    });

    expect(previousButtonToBeDisabled).toBeDisabled();
  });

  it('previous button should be disabled when user try to clicked it', () => {
    render(<PaginationButton
      activePage={0}
      gotoPageFunction={() => {}}
      nextPage={() => {}}
      previousPage={() => {}}
      canNextPage={false}
      canPreviousPage={false}
    />);
    const nextButton = screen.getByRole('button', {
      name: 'Next',
    });

    expect(nextButton).toBeDisabled();
  });
});
