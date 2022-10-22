export enum DeliveryTypes {
  MAILING = 'MAILING',
  COME_YOURSELF = 'COME_YOURSELF',
  DELIVERY_SERVICE = 'DELIVERY_SERVICE',
}

export const deliveryTypeToText = (type: DeliveryTypes): string => {
  const text = {
    [DeliveryTypes.MAILING]: 'Перессылка почтой',
    [DeliveryTypes.COME_YOURSELF]: 'Самовывоз',
    [DeliveryTypes.DELIVERY_SERVICE]: 'Отправка службой доставки',
  }[type];

  if (text) return text;

  throw new Error('Type is missing');
};
