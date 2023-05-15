import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pattern } from '../entities/pattern.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PatternRepository extends Repository<Pattern> {
  constructor(
    @InjectRepository(Pattern)
    private readonly repository: Repository<Pattern>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
