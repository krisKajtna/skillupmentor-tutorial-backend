import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Permission } from 'entities/permission.entity'
import { Role } from 'entities/role.entity'
import Logging from 'library/Logging'
import { AbstractService } from 'modules/common/abstract.service'
import { Repository } from 'typeorm'

import { CreateUpdateRoleDto } from './dto/create-update-role.dto'

@Injectable()
export class RolesService extends AbstractService {
  constructor(@InjectRepository(Role) private readonly rolesRepository: Repository<Role>) {
    super(rolesRepository)
  }

  async create(createRoleDto: CreateUpdateRoleDto, permissionIds: { id: string }[]): Promise<Role> {
    try {
      const permission = this.rolesRepository.create({ ...createRoleDto, permissions: permissionIds })
      return this.rolesRepository.save(permission)
    } catch (error) {
      Logging.error(error)
      throw new BadRequestException('something went wrong when creating new role')
    }
  }

  async update(roleId: string, udateRoleDto: CreateUpdateRoleDto, permissionIds: { id: string }[]): Promise<Role> {
    const role = (await this.findById(roleId)) as Role
    try {
      role.name = udateRoleDto.name
      role.permissions = permissionIds as Permission[]
      return this.rolesRepository.save(role)
    } catch (error) {
      Logging.error(error)
      throw new InternalServerErrorException('something went wrong while udating the role')
    }
  }
}
