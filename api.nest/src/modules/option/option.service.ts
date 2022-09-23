import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './option.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  async getValueByOptionName(optionName: string): Promise<any> {
    const option = await this.optionRepository.findOne({
      select: { option_value: true },
      where: { option_name: optionName },
    });

    return option?.option_value ?? null;
  }
}
