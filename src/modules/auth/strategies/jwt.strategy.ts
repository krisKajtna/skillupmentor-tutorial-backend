import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { User } from 'entities/user.entity'
import { Request } from 'express'
import { TokenPayload } from 'interfaces/auth.interface'
import Logging from 'library/Logging'
import { UsersService } from 'modules/users/users.service'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UnauthorizedException } from '@nestjs/common' // Import UnauthorizedException

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UsersService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const token = request?.cookies?.access_token
          if (!token) {
            Logging.error('No access token found in cookies')
            throw new UnauthorizedException('Access token is missing') // Throw Unauthorized error here
          }
          return token
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  async validate(payload: TokenPayload): Promise<User> {
    return this.userService.findById(payload.sub)
  }
}
