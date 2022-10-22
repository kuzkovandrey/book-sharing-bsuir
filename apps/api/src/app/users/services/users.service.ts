import { CreateUserDto } from '@book-sharing/api-interfaces';
import { UserAlredyExistsError, UserNotFoundError } from '@core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOneBy({
      username: createUserDto.username,
    });

    if (!user) return this.usersRepository.create(createUserDto).save();

    throw new UserAlredyExistsError();
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findById(id: number): Promise<UserEntity> {
    const user = this.usersRepository.findOneBy({ id });

    if (!user) throw new UserNotFoundError();

    return user;
  }

  findByUsername(username: string): Promise<UserEntity> {
    const user = this.usersRepository.findOneBy({ username });

    if (!user) throw new UserNotFoundError();

    return user;
  }

  async update(
    id: number,
    { username, email, password, refreshToken }: Partial<CreateUserDto>
  ) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new UserNotFoundError();

    user.username = username ?? user.username;
    user.email = email ?? user.email;
    user.password = password ?? user.password;
    user.refreshToken = refreshToken ?? user.refreshToken;

    return user.save();
  }

  async remove(id: number): Promise<unknown> {
    return await this.usersRepository.delete(id);
  }
}
