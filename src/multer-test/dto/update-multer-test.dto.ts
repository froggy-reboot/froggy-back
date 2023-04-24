import { PartialType } from '@nestjs/swagger';
import { CreateMulterTestDto } from './create-multer-test.dto';

export class UpdateMulterTestDto extends PartialType(CreateMulterTestDto) {}
