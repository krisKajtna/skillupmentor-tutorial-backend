import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'entities/user.entity'
import Logging from 'library/Logging'
import { UsersService } from 'modules/users/users.service'
import { compareHash, hash } from 'utils/bcrypt'
import { RegisterUserDto } from './dto/register-user.dto'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User> {
    Logging.info('validate user...')
    const user = await this.usersService.findBy({ email: email })
    if (!user) {
      throw new BadRequestException('invalid credentials')
    }
    if (!(await compareHash(password, user.password))) {
      throw new BadRequestException('invalid credentials')
    }

    Logging.info('User is valid')
    return user
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const hashedPassword = await hash(registerUserDto.password)
    return this.usersService.create({
      role_id: null,
      ...registerUserDto,
      password: hashedPassword,
    })
  }
}
