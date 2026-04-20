import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const.ts';
import { toggleFavoriteStatus } from '../../store/api-actions.ts';
import type { RootState, AppDispatch } from '../../store/index.ts';
import { selectIsAuthorized, selectIsOfferUpdating } from '../../store/selectors.ts';

type FavoriteButtonProps = {
  offerId: string;
  isFavorite: boolean;
  buttonClassName: string;
  activeButtonClassName: string;
  iconClassName: string;
  iconWidth: number;
  iconHeight: number;
};

const FavoriteButton = ({
  offerId,
  isFavorite,
  buttonClassName,
  activeButtonClassName,
  iconClassName,
  iconWidth,
  iconHeight,
}: FavoriteButtonProps): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuthorized = useSelector((state: RootState) => selectIsAuthorized(state));
  const isUpdating = useSelector((state: RootState) =>
    selectIsOfferUpdating(state, offerId),
  );

  const handleClick = useCallback(() => {
    if (!isAuthorized) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(
      toggleFavoriteStatus({
        offerId,
        status: isFavorite ? 0 : 1,
      }),
    );
  }, [dispatch, isAuthorized, isFavorite, navigate, offerId]);

  return (
    <button
      className={`${buttonClassName} ${isFavorite ? activeButtonClassName : ''} button`}
      type="button"
      onClick={handleClick}
      disabled={isUpdating}
    >
      <svg className={iconClassName} width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
};

const MemoizedFavoriteButton = memo(FavoriteButton);

export default MemoizedFavoriteButton;
