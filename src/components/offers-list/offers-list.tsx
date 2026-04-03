import React from 'react';
import CityCard from '../city-card/city-card.tsx';
import {Offer} from '../../types/offer.ts';

type OffersListProps = {
  offers: Offer[];
  listClassName: string;
  cardClassName?: string;
  imageWrapperClassName?: string;
  infoClassName?: string;
  imageWidth?: number;
  imageHeight?: number;
  onActiveOfferChange?: (offerId: string | null) => void;
};

const OffersList = ({
  offers,
  listClassName,
  cardClassName,
  imageWrapperClassName,
  infoClassName,
  imageWidth,
  imageHeight,
  onActiveOfferChange
}: OffersListProps): React.ReactElement => (
  <div className={listClassName}>
    {offers.map((offer) => (
      <CityCard
        key={offer.id}
        offer={offer}
        cardClassName={cardClassName}
        imageWrapperClassName={imageWrapperClassName}
        infoClassName={infoClassName}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        onActiveOfferChange={onActiveOfferChange}
      />
    ))}
  </div>
);

export default OffersList;
