import { UserEntity } from '../entities/user.entity';
import { AuthDto } from '@book-sharing/api-interfaces';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';

const mockUserList = [new UserEntity(), new UserEntity()];

const mockUsersService: Partial<UsersService> = {
  create: jest
    .fn()
    .mockImplementation(({ username, email, password }: AuthDto) => ({
      username,
      email,
      password,
    })),
  findAll: jest.fn().mockImplementation(() => mockUserList),
};

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    usersService = moduleRef.get(UsersService);
  });

  it('should be create new user', () => {
    expect(
      usersService.create({
        username: 'username',
        email: 'er@er.com',
        password: '1234',
      })
    ).toBeInstanceOf(UserEntity);
  });

  it('should be return all users', () => {
    expect(usersService.findAll()).toEqual(mockUserList);
  });
});
