import type {
  TeacherCreateInput,
  TeacherRepository,
  TeacherUpdateInput,
  TeacherView,
} from '../../ports/teacher.repository';
import { NotFoundError } from '../../shared/errors/not-found.error';

export class TeachersCrud {
  constructor(private readonly repo: TeacherRepository) {}

  create(input: TeacherCreateInput): Promise<TeacherView> {
    return this.repo.create(input);
  }

  findAll(pagination?: { skip?: number; take?: number }): Promise<TeacherView[]> {
    return this.repo.findAll(pagination);
  }

  async findByUuid(uuid: string): Promise<TeacherView> {
    const found = await this.repo.findByUuid(uuid);
    if (!found) throw new NotFoundError('Teacher not found');
    return found;
  }

  async updateByUuid(uuid: string, input: TeacherUpdateInput): Promise<TeacherView> {
    await this.findByUuid(uuid);
    return this.repo.updateByUuid(uuid, input);
  }

  async deleteByUuid(uuid: string): Promise<TeacherView> {
    await this.findByUuid(uuid);
    return this.repo.deleteByUuid(uuid);
  }
}

