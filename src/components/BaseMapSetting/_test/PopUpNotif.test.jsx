import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import PopUpNotif from '../PopUpNotif';

/**
 * test case
 * Should not render the component when isShow state is false
 * Should called function just onces when button close is clicked
 * Should not rendered an element at first
 */

describe('Pop Up Notif Component ( <PopUpNotif /> )', () => {
  it('Should render the component correctly', () => {
    // assert
    render(<PopUpNotif icon="test" isShow message="Error" />);
    const popUpText = screen.getByRole('heading', {
      level: 1,
    });
    // action
    expect(popUpText).toBeVisible();
    expect(popUpText).toBeInTheDocument();
  });
  it('Should called onces when button close is clicked', () => {
    const mockFunction = jest.fn();
    render(<PopUpNotif icon="" isShow message="Gagal mendapatkan data" onClose={mockFunction} />);
    const buttonCloseElement = screen.getByRole('button', {
      name: 'x',
    });
    fireEvent.click(buttonCloseElement);
    // assert
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
  it('Should not rendered an element at first', () => {
    render(<PopUpNotif icon="asd" isShow={false} message="Close" onClose={() => {}} />);
    const popupNotificationContainer = screen.queryByRole('button', {
      name: 'x',
    });
    expect(popupNotificationContainer).not.toBeInTheDocument();
  });
  it('Should not displayed after button close is clicked', () => {
    let isShow = true;
    const handleClose = jest.fn().mockImplementation(() => {
      isShow = false;
    });
    const { rerender } = render(<PopUpNotif icon="asd" isShow={isShow} message="asdasd" onClose={handleClose} />);

    const buttonCloseElement = screen.getByRole('button', {
      name: 'x',
    });
    fireEvent.click(buttonCloseElement);

    rerender(<PopUpNotif icon="asd" isShow={isShow} message="asdasd" onClose={handleClose} />);
    expect(screen.queryByRole('button', {
      name: 'x',
    })).not.toBeInTheDocument();
  });
});
