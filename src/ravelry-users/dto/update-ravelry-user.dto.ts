import { PartialType } from '@nestjs/swagger';
import { CreateRavelryUserDto } from './create-ravelry-user.dto';

export class UpdateRavelryUserDto extends PartialType(CreateRavelryUserDto) {}
