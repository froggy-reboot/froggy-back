import { Injectable } from '@nestjs/common';
import { CreatePatternDto } from './dto/create-pattern.dto';
import { UpdatePatternDto } from './dto/update-pattern.dto';
import { RavelryApiService } from 'src/utils/api/ravelryApiService';
import { InjectRepository } from '@nestjs/typeorm';
import { Pattern } from './entities/pattern.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatternsService {
  constructor(
    private ravelryApiService: RavelryApiService,
    @InjectRepository(Pattern)
    private readonly patternRepository: Repository<Pattern>,
  ) {}
  async create(createPatternDto: CreatePatternDto) {
    const result = await this.patternRepository.save(
      this.patternRepository.create(createPatternDto),
    );
    return result;
  }

  findAll() {
    return `This action returns all patterns`;
  }

  async findOneByRavelryPatternId(ravelryPatternId: number) {
    const entity = await this.patternRepository.findOne({
      where: { ravelryPatternId: ravelryPatternId },
    });
    return entity;
  }

  update(id: number, updatePatternDto: UpdatePatternDto) {
    return `This action updates a #${id} pattern`;
  }

  remove(id: number) {
    return `This action removes a #${id} pattern`;
  }

  async findOrCreatePattern(createPatternDto: CreatePatternDto) {
    const pattern = await this.findOneByRavelryPatternId(
      createPatternDto.ravelryPatternId,
    );
    if (!pattern) {
      const result = await this.create(createPatternDto);
      return result;
    }
    return pattern;
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
