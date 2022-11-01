import { ExchangeStatus } from '../values';

/**


{
  "fromOfferId": 2,
  "toOfferId": 1
}


 */

export interface CreateExchangeDto {
  fromOfferId: number;
  toOfferId: number;
}

export interface ChangeExchangeStatusDto {
  exchangeId: number;
  status: ExchangeStatus;
}
