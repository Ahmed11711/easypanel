import { Controller, Get } from '@nestjs/common';
import { ProjectService } from '../service/project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly wallteRepo: ProjectService) {}

  @Get()
  getAll() {
    return this.wallteRepo.getWallte();
  }
}
