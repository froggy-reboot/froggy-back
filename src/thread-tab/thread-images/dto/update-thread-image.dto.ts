import { PartialType } from '@nestjs/swagger';
import { CreateThreadImageDto } from './create-thread-image.dto';

export class UpdateThreadImageDto extends PartialType(CreateThreadImageDto) {}
