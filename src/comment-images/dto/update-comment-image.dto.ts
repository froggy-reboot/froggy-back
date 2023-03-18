import { PartialType } from '@nestjs/swagger';
import { CreateCommentImageDto } from './create-comment-image.dto';

export class UpdateCommentImageDto extends PartialType(CreateCommentImageDto) {}
