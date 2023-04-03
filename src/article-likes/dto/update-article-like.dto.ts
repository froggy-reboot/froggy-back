import { PartialType } from '@nestjs/swagger';
import { CreateArticleLikeDto } from './create-article-like.dto';

export class UpdateArticleLikeDto extends PartialType(CreateArticleLikeDto) {}
