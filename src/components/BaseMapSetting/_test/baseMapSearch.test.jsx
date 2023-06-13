import React from 'react';
import '@testing-library/jest-dom';
import {
  screen, render, cleanup, act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BaseMapSearch from '../BaseMapSearch';

/**
 * Test Case
 * Should render correctly
 * Should change search input value when typed by user
 * should called an function that handler type input by user
 */

describe('Base Map Search', () => {
  it('Should render correctly', () => {
    // arrange
    render(<BaseMapSearch onSearchKeywordValueChange={() => {}} searchKeywordValue="" />);
    const searchInput = screen.getByRole('textbox');

    // assert
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.getAttribute('placeholder')).toBe('Search Map');
  });
  it('Should change search input value when typed by user', async () => {
    let searchValue = '';
    const onChangeHandler = jest.fn();
    const { rerender } = render(<BaseMapSearch
      onSearchKeywordValueChange={onChangeHandler}
      searchKeywordValue={searchValue}
    />);

    const searchInput = screen.getByPlaceholderText('Search Map');

    // action
    userEvent.type(searchInput, 'Jawa Barat');
    searchValue = 'Jawa Barat';
    rerender(<BaseMapSearch searchKeywordValue={searchValue} onSearchKeywordValueChange={() => {}} />);

    // assert
    expect(searchInput).toHaveValue('Jawa Barat');
  });
});
