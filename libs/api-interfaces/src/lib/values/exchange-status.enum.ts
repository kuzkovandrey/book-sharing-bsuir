export enum ExchangeStatus {
  PENDING,
  CONFIRM,
  CANCLE,
}

export const exchangeStatusToText = (status: ExchangeStatus): string => {
  const text = {
    [ExchangeStatus.PENDING]: 'Ожидание',
    [ExchangeStatus.CONFIRM]: 'Подтвержден',
    [ExchangeStatus.CANCLE]: 'Отменен',
  }[status];

  if (text) return text;

  throw new Error('exchangeStatusToTest function: status is missing');
};
