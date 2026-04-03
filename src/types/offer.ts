export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: string;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: Host;
  description: string[];
};
