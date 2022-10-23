import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookOfferEntity } from './entities';
import { BookOffersService } from './services';
import { BooksModule } from '@books/books.module';
import { UsersModule } from '@users/users.module';
import { BookOffersController } from './controllers';
import { CommentEntity } from './entities/comment.entity';
import { CommentsService } from './services/comments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookOfferEntity, CommentEntity]),
    BooksModule,
    UsersModule,
  ],
  controllers: [BookOffersController],
  providers: [BookOffersService, CommentsService],
})
export class BookOffersModule {}
