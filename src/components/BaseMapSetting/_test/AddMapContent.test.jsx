import React from 'react';
import AddMapContent from '../AddMapContent';
import NavigationLink from '../../NavigationLink';
import OnlineSource from '../../InputWeb/OnlineSource';
import '@testing-library/jest-dom';
import userEvent, { render, screen } from '@testing-library/react';

describe('<Add Map Content /> Component', () => {
  it('Should render correctly', () => {
    render(<AddMapContent sourceComponent={<OnlineSource />} title="Add Online Source" onAddHandler={() => {}} setOptions={[]} />);
    const title = screen.getByRole('heading', {
      level: 1,
    });
    const titleText = screen.getByText('Add Online Source');

    const navigationButtonsLink = screen.getAllByRole('button');
    navigationButtonsLink.forEach((navLink) => {
      expect(navLink).toBeInTheDocument();
    });

    expect(title).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
  });
});

it('asd', () => {
  expect(true).toBeTruthy();
});
