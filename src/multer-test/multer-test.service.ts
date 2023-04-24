import { Injectable } from '@nestjs/common';
import { CreateMulterTestDto } from './dto/create-multer-test.dto';
import { UpdateMulterTestDto } from './dto/update-multer-test.dto';

@Injectable()
export class MulterTestService {
  create(createMulterTestDto: CreateMulterTestDto) {
    return 'This action adds a new multerTest';
  }

  findAll() {
    return `This action returns all multerTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} multerTest`;
  }

  update(id: number, updateMulterTestDto: UpdateMulterTestDto) {
    return `This action updates a #${id} multerTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} multerTest`;
  }
}
