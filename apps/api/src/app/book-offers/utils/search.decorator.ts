import {
  BookOfferSearchParams,
  LocationRegion,
} from '@book-sharing/api-interfaces';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type Bool = 'false' | 'true';

const toBoolean = (is: Bool): boolean => {
  return is === 'true';
};

export const SearchParams = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): BookOfferSearchParams => {
    const [args] = ctx.getArgs();
    const queries = args.query as BookOfferSearchParams;

    return {
      isActive: queries.isActive
        ? toBoolean(queries.isActive as unknown as Bool)
        : undefined,
      deliveryType: queries.deliveryType,
      offerType: queries.offerType,
      text: queries.text ?? '',
      region: queries.region ?? ('' as LocationRegion),
    };
  }
);
