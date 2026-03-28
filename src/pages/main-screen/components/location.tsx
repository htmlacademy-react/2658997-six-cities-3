import React from 'react';
import {Link} from 'react-router-dom';

const Location = (city: string): React.ReactElement =>
  (
    <li className="locations__item">
      <Link className="locations__item-link tabs__item" to="/">
        <span>{city}</span>
      </Link>
    </li>
  );

export default Location;
