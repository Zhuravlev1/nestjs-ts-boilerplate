import { HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { DeleteResult, FindManyOptions, Repository } from 'typeorm';
import { ListResponse } from '..';

export const ERROR_VALIDATION_FAILED = 'Input data validation failed';

export abstract class BaseCrudService<E, D, C, U> {
  protected abstract repository: Repository<E>;

  async find(options?: FindManyOptions<E>): Promise<ListResponse<D>> {
    const items = await this.repository.find(options);
    const count = await this.repository.count(options);
    return {
      items: items.map(item => this.buildDto(item)),
      count,
    };
  }

  async create(dto: C): Promise<D> {
    const entity = await this.createEntity(dto);

    const errors = await validate(entity);
    if (errors.length > 0) {
      throw new HttpException(
        { message: ERROR_VALIDATION_FAILED, errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const saved = await this.repository.save(entity);

      return this.buildDto(saved);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async findOne(id: string): Promise<D> {
    const entity = await this.repository.findOne(id);
    return this.buildDto(entity);
  }

  async update(id: string, dto: U): Promise<D> {
    const toUpdate = await this.repository.findOne(id);
    const updated = Object.assign(toUpdate, dto);
    await this.repository.save(updated);

    return this.buildDto(updated);
  }

  protected abstract buildDto(entity: E): D;

  protected abstract async createEntity(createDto: C): Promise<E>;
}

export const ASCENDING = 'ASC';
export const DESCENDING = 'DESC';
