import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { FindOptions } from 'src/utils/types/find-options.type';
import { Repository } from 'typeorm';
import { Report } from './entities/reprot.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private ReportRepository: Repository<Report>,
  ) {}

  async findOne(options: FindOptions<Report>) {
    return this.ReportRepository.findOne({
      where: options.where,
    });
  }

  async findMany(options: FindOptions<Report>) {
    return this.ReportRepository.find({
      where: options.where,
    });
  }

  async create(data: DeepPartial<Report>) {
    return this.ReportRepository.save(this.ReportRepository.create(data));
  }

  async softDelete(id: number): Promise<void> {
    await this.ReportRepository.softDelete(id);
  }
}
