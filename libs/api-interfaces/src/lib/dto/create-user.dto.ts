export interface CreateUserDto {
  username: string;
  password: string;
  email: string;
  refreshToken: string;
  telephones?: string[];
}
