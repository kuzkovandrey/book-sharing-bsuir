export enum OfferType {
  EXCHANGE = 'EXCHANGE',
  BUY = 'BUY',
  FREE = 'FREE',
  DESIRE = 'DESIRE',
}

export const offerTypeToText = (type: OfferType): string => {
  const text = {
    [OfferType.EXCHANGE]: 'Обменяю',
    [OfferType.BUY]: 'Продам',
    [OfferType.FREE]: 'Отдам',
    [OfferType.DESIRE]: 'Хочу',
  }[type];

  if (text) return `${text} книгу`;

  return `Любые`;
};

export const stringifyOfferType = (type: OfferType) => offerTypeToText(type);
