import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../entities/article.entity';
import { Repository } from 'typeorm';
import { ReportArticleDto } from 'src/article-tab/dto/article-report.dto';
import { ReportService } from 'src/report/report.service';
import { Report } from 'src/report/entities/reprot.entity';
import { CreateArticleReportDto } from 'src/report/dto/create-article-report.dto';
import { ArticlesReadService } from './articles.read.service';

@Injectable()
export class ArticlesReportService {
  constructor(
    private articleReadService: ArticlesReadService,
    private reportService: ReportService,
  ) {}

  async reportArticle(reportArticleDto: ReportArticleDto, reporterId: number) {
    const article = await this.articleReadService.findOne(
      reportArticleDto.articleId,
    );
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    const report: Report = CreateArticleReportDto.mapDTOToDomain(
      reportArticleDto,
      reporterId,
      article,
    );

    const result = await this.reportService.create(report);
    return result;
  }
}
