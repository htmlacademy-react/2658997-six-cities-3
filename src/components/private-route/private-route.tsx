import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import type { RootState } from '../../store/index.ts';
import React from 'react';
import Spinner from '../spinner/spinner.tsx';

type PrivateRouteProps = {
  children: React.ReactElement;
};

const PrivateRoute = ({ children }: PrivateRouteProps): React.ReactElement => {
  const { authorizationStatus, loading } = useSelector(
    (state: RootState) => state.user,
  );

  if (loading) {
    return <Spinner />;
  }

  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
};

export default PrivateRoute;
