import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticlesRepository } from './repository/article.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), UsersModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesRepository],
})
export class ArticlesModule {}
