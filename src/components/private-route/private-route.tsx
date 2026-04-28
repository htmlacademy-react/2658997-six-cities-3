import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import type { RootState } from '../../store/index.ts';
import React from 'react';
import Spinner from '../spinner/spinner.tsx';
import {
  selectAuthorizationStatus,
  selectUserLoading,
} from '../../store/selectors.ts';

type PrivateRouteProps = {
  children: React.ReactElement;
};

const PrivateRoute = ({ children }: PrivateRouteProps): React.ReactElement => {
  const authorizationStatus = useSelector(
    (state: RootState) => selectAuthorizationStatus(state),
  );
  const loading = useSelector(
    (state: RootState) => selectUserLoading(state),
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
