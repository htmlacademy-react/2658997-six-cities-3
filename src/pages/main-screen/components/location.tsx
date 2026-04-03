import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../../const.ts';

type LocationProps = {
  city: string;
}

const Location = ({city}: LocationProps): React.ReactElement =>
  (
    <li className="locations__item">
      <Link className="locations__item-link tabs__item" to={AppRoute.Main}>
        <span>{city}</span>
      </Link>
    </li>
  );

export default Location;
