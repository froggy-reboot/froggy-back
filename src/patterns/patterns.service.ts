import { Injectable } from '@nestjs/common';
import { CreatePatternDto } from './dto/create-pattern.dto';
import { UpdatePatternDto } from './dto/update-pattern.dto';
import { RavelryApiService } from 'src/utils/api/ravelryApiService';

@Injectable()
export class PatternsService {
  constructor(private ravelryApiService: RavelryApiService) {}
  create(createPatternDto: CreatePatternDto) {
    return 'This action adds a new pattern';
  }

  findAll() {
    return `This action returns all patterns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pattern`;
  }

  update(id: number, updatePatternDto: UpdatePatternDto) {
    return `This action updates a #${id} pattern`;
  }

  remove(id: number) {
    return `This action removes a #${id} pattern`;
  }

  async findPatternNamesByApi(target: string) {
    const patternList = await this.ravelryApiService.searchPattern(target);
    const patternNameList = patternList.patterns.map((pattern) => {
      return {
        patternName: pattern.name,
        ravelryPatternId: pattern.id,
      };
    });
    return patternNameList;
  }
}
