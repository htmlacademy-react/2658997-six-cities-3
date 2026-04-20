import React, { memo } from 'react';
import type { City } from '../../../store/offers-slice.ts';

type MainEmptyStateProps = {
  city: City;
};

const MainEmptyState = ({ city }: MainEmptyStateProps): React.ReactElement => (
  <section className="cities__no-places">
    <div className="cities__status-wrapper tabs__content">
      <b className="cities__status">No places to stay available</b>
      <p className="cities__status-description">
        We could not find any property available at the moment in {city}
      </p>
    </div>
  </section>
);

const MemoizedMainEmptyState = memo(MainEmptyState);

export default MemoizedMainEmptyState;
