import { PartialType } from '@nestjs/swagger';
import { CreateThreadCommentDto } from './create-thread-comment.dto';

export class UpdateThreadCommentDto extends PartialType(CreateThreadCommentDto) {}
