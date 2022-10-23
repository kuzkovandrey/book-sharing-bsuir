import { BookOfferSearchParams } from '@book-sharing/api-interfaces';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SearchParams = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): BookOfferSearchParams => {
    const [args] = ctx.getArgs();
    const queries = args.query;

    return {
      isActive: queries.isActive
        ? queries.isActive === 'false'
          ? false
          : true
        : undefined,
      username: queries.username,
      deliveryType: queries.deliveryType,
      offerType: queries.offerType,
      text: queries.text ?? '',
    };
  }
);
