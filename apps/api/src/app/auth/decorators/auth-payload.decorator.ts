import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type AuthPayloadType = {
  userId: number;
  username: string;
  refreshToken?: string;
};

export const AuthPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthPayloadType => {
    const { user } = ctx.switchToHttp().getRequest();
    const { sub: userId, username, refreshToken } = user;

    return {
      userId: +userId,
      username,
      refreshToken,
    };
  }
);
