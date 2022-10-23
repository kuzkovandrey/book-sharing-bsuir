import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@users/entities';
import { Repository } from 'typeorm';
import { CommentEntity, BookOfferEntity } from '../entities';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>
  ) {}

  findAllByBookOfferId(id: number): Promise<CommentEntity[]> {
    return this.commentsRepository.find({
      where: {
        bookOffer: { id },
      },
      relations: {
        user: true,
      },
    });
  }

  create(
    user: UserEntity,
    bookOffer: BookOfferEntity,
    text: string
  ): Promise<CommentEntity> {
    return this.commentsRepository.create({ user, bookOffer, text }).save();
  }
}
