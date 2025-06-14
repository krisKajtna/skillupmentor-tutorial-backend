import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator'
import { Match } from 'decorators/match.decorator'

export class RegisterUserDto {
  @IsOptional()
  first_name?: string

  @IsOptional()
  last_name?: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z])[^\s]{6,}$/, {
    message:
      'Password must have at least one number, lower or upper case letter and it has to be longer than 5 characters.',
  })
  password: string

  @IsNotEmpty()
  @Match(RegisterUserDto, (field) => field.password, { message: 'Passwords do not match.' })
  confirm_password: string
}
