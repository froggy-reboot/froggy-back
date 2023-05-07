import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PatternsService } from './patterns.service';
import { CreatePatternDto } from './dto/create-pattern.dto';
import { UpdatePatternDto } from './dto/update-pattern.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { searchPatternResDto } from './dto/show-pattern.dto';

@ApiTags('패턴')
@Controller({
  path: 'patterns',
  version: '1',
})
export class PatternsController {
  constructor(private readonly patternsService: PatternsService) {}

  @Post()
  create(@Body() createPatternDto: CreatePatternDto) {
    return this.patternsService.create(createPatternDto);
  }

  // @Get()
  // findAll() {
  //   return this.patternsService.findAll();
  // }

  @Get('pattern-name')
  @ApiQuery({ name: 'search', type: String, required: true })
  @ApiResponse({
    status: 200,
    type: [searchPatternResDto],
    description: 'pattern이름의 배열',
  })
  async findPatternNamesUsingApi(@Query('search') search: string) {
    const patternList = await this.patternsService.findPatternNamesByApi(
      search,
    );
    return patternList;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patternsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatternDto: UpdatePatternDto) {
    return this.patternsService.update(+id, updatePatternDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patternsService.remove(+id);
  }
}
