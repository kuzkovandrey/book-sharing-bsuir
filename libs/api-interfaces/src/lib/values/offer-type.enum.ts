export enum OfferType {
  EXCHANGE = 'EXCHANGE',
  BUY = 'BUY',
  FREE = 'FREE',
  DESIRE = 'DESIRE',
}

export const offerTypeToText = (type: OfferType): string =>
  `${
    {
      [OfferType.EXCHANGE]: 'Обменяю',
      [OfferType.BUY]: 'Продам',
      [OfferType.FREE]: 'Отдам',
      [OfferType.DESIRE]: 'Хочу',
    }[type]
  } книгу`;
