import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ArticlePriority, ImagePosition } from 'graphql/generated';
import ArticleCard from '../ArticleCard.view';

describe('Detail Officer View', () => {
  const data = {
    id: 'incidentId',
    subject: 'test subject ',
    location: null,
    approved: null,
    date: '2022-08-10T10:40:06.191Z',
    time: '2022-08-11T10:40:09.985Z',
    dayTime: '11:40 - Wed 10, Aug 22',
    description: 'test description',
    createdBy: {
      fullName: 'aaa',
      id: 'cl4pe3eu91312371op4c4k2lih2',
      businesses: [{ name: 'user business', id: '' }],
    },
    crimeTypes: [{ id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling' }],
    groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
    images: [
      {
        id: 'cl6owsuzo33227f9pe9zk4wone',
        optimised: null,
        url: 'htt',
        position: ImagePosition.CenterCenter,
      },
    ],
    offenders: [],
    priority: ArticlePriority.High,
    title: '',
    updatedAt: '2022-08-11T10:40:09.985Z',
    tags: [],
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ArticleCard
          article={data}
          deleteRights={false}
          menuRights={false}
          openLightbox={jest.fn()}
          onNavigate={jest.fn()}
          onDelete={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('OFFENDERS')).toBeInTheDocument();
  });
});
