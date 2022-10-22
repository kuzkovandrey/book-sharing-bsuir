import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  accessSecret: process.env.JWT_ACCESS_SECRET,
}));
