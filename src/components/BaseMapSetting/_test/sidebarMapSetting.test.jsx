import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SideBarMapSetting from '../SidebarMapSetting';

describe('<SidebarMapSeting /> Component', () => {
  it('Should render correctly', () => {
    render(
      <BrowserRouter>
        <SideBarMapSetting />
      </BrowserRouter>,
    );
    const allButton = screen.getAllByRole('button');
    expect(allButton).toHaveLength(3);
    allButton.forEach((button) => expect(button).toBeInTheDocument());
  });
});
