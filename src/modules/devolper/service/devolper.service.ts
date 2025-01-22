import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Devolper } from '../entity/devolper.entity';
import { IDevolper } from '../interface/devolper.interface';

@Injectable()
export class DevolperService {
  constructor(
    @InjectRepository(Devolper)
    private readonly devolRepo: Repository<Devolper>,
  ) {}

  async getAll(): Promise<IDevolper[] | []> {
    return await this.devolRepo.find({ where: { status: true },
      withDeleted: false});
  }

  async getOne(id: number): Promise<IDevolper | null> {
    const deveolper = await this.devolRepo.findOne({
      where: { id },
      relations: ['wallte.project'],
    });
    if (!deveolper) {
      throw new NotFoundException('THE ID IS NOT FOUND');
    }

    return deveolper;
  }
}
