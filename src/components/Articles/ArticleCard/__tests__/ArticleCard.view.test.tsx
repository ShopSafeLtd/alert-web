import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import ArticleCard from '../ArticleCard.view';
import { ArticlePriority, CompleteStatus, ImagePosition } from 'graphql/types';

describe('Detail Officer View', () => {
  const data = {
    id: 'incidentId',
    status: CompleteStatus.Completed,
    location: null,
    approved: null,
    date: new Date('2022-07-25T08:57:55.299Z'),
    time: new Date('2022-07-25T08:57:55.299Z'),
    dayTime: '11:40 - Wed 10, Aug 22',
    description: 'test description',
    createdBy: {
      fullName: 'aaa',
      id: 'cl4pe3eu91312371op4c4k2lih2',
      businesses: [{ name: 'user business', id: '' }],
    },
    watermarkImage: false,

    crimeTypes: [{ id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling' }],
    groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
    images: [
      {
        id: 'cl6owsuzo33227f9pe9zk4wone',
        optimised: null,
        url: 'htt',
        position: ImagePosition.CenterCenter,
        rotation: 0,
      },
    ],
    offenders: [],
    priority: ArticlePriority.High,
    title: '',
    updatedAt: new Date('2022-07-25T08:57:55.299Z'),
    tags: [],
    statues: CompleteStatus.Completed,
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
