import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../../store/index.ts';
import { addComment } from '../../store/api-actions.ts';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import ErrorMessage from '../error-message/error-message.tsx';

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;
const MIN_RATING_VALUE = 1;
const MAX_RATING_VALUE = 5;
const UNSELECTED_RATING = 0;
const RATING_VALUES = [5, 4, 3, 2, 1] as const;
const RATING_ICON_WIDTH = 37;
const RATING_ICON_HEIGHT = 33;
const RATING_TITLES: Record<number, string> = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
};

type ReviewFormProps = {
  offerId: string;
};

const ReviewForm = ({ offerId }: ReviewFormProps): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorizationStatus = useSelector(
    (state: RootState) => state.user.authorizationStatus,
  );
  const [rating, setRating] = useState<number>(UNSELECTED_RATING);
  const [review, setReview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setSubmitError(null);
    setReview(evt.target.value);
  };

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSubmitError(null);
    setRating(Number(evt.target.value));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    if (
      review.length < MIN_REVIEW_LENGTH ||
      review.length > MAX_REVIEW_LENGTH ||
      rating < MIN_RATING_VALUE ||
      rating > MAX_RATING_VALUE
    ) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    dispatch(addComment({ offerId, comment: review, rating }))
      .unwrap()
      .then(() => {
        setReview('');
        setRating(UNSELECTED_RATING);
        setIsSubmitting(false);
      })
      .catch(() => {
        setIsSubmitting(false);
        setSubmitError('Failed to post comment. Please try again.');
      });
  };

  const isSubmitDisabled =
    isSubmitting ||
    rating < MIN_RATING_VALUE ||
    rating > MAX_RATING_VALUE ||
    review.length < MIN_REVIEW_LENGTH ||
    review.length > MAX_REVIEW_LENGTH;

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return null as unknown as React.ReactElement;
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      {submitError && <ErrorMessage message={submitError} />}
      <div className="reviews__rating-form form__rating">
        {RATING_VALUES.map((value) => (
          <React.Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={rating === value}
              onChange={handleRatingChange}
              disabled={isSubmitting}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={RATING_TITLES[value]}
            >
              <svg className="form__star-image" width={RATING_ICON_WIDTH} height={RATING_ICON_HEIGHT}>
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={handleReviewChange}
        disabled={isSubmitting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
