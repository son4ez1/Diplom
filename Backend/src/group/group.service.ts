import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entity/group.entity';
import { EntityManager } from 'typeorm';
import { CuratorService } from 'src/curator/curator.service';

@Injectable()
export class GroupService {
  constructor(
    private manager: EntityManager,
    private curatorService: CuratorService,
  ) {}

  async create(dto: CreateGroupDto): Promise<Group> {
    const curator = await this.curatorService.findOne(dto.curator_id);
    const group = await this.manager.create(Group, {
      name: dto.name,
      curator: curator,
    });
    return await this.manager.save(Group, group);
  }

  async findMany(): Promise<Group[]> {
    return await this.manager.find(Group);
  }

  async findOne(id: string): Promise<Group> {
    try {
      return await this.manager.findOneOrFail(Group, { where: { id } });
    } catch (error) {
      throw new NotFoundException(`Группа с ID ${id} не найдена`);
    }
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.findOne(id);

    // Обновление полей
    Object.assign(group, updateGroupDto);

    return await this.manager.save(Group, group);
  }

  async remove(id: string): Promise<void> {
    const group = await this.findOne(id);
    await this.manager.remove(Group, group);
  }
}
