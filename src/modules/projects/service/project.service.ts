import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entity/projects.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly wallteRepo: Repository<Project>,
  ) {}

  async getWallte() {
    const walltes = await this.wallteRepo.find();
    return walltes;
  }
}
