import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  getPagination(query: any) {
    const { skip, take, page, limit } = query;

    return {
      skip: skip || 0,
      take: take || 10,
      page: page || 1,
      limit: limit || 10,
    };
  }

  async paginate(repository, query: any, conditions: any = {}, select: string[] = []) {
    const { skip, take, page, limit } = this.getPagination(query);

    const options: any = {
      where: conditions,
      skip,
      take,
    };

    // Add select option if provided
    if (select.length > 0) {
      options.select = select;
    }

    const [data, total] = await repository.findAndCount(options);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
