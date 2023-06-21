import React from 'react';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBaseMap from '../NavBaseMap';

/**
 * test case
 * Should render correctly
 */

describe('<NavBaseMap /> Component', () => {
  it('Should render correctly', () => {
    render(<BrowserRouter><NavBaseMap navName="test" href="/map-setting" isActive /></BrowserRouter>);
    const navText = screen.getByText('test');
    expect(navText).toBeVisible();
  });
});
