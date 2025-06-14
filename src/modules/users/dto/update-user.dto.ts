import { IsEmail, IsOptional, Matches, ValidateIf } from 'class-validator'
import { Match } from 'decorators/match.decorator'

export class UpdateUserDto {
  @IsOptional()
  first_name?: string
  @IsOptional()
  last_name?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  refresh_token?: string

  @IsOptional()
  role_id?: string

  @IsOptional()
  avatar?: string

  @ValidateIf((o) => typeof o.password === 'string' && o.password.length > 0)
  @IsOptional()
  @Matches(/^(?=.*\d)(?=.*[A-Za-z])[A-Za-z\d@#$%^&*+=:;{}[\]\\|,.!?'"()\-_\s]{6,}$/, {
    message: 'Geslo mora vsebovati vsaj eno številko, vsaj eno črko in biti dolgo vsaj 6 znakov.',
  })
  password?: string

  @ValidateIf((o) => typeof o.confirm_password === 'string' && o.confirm_password.length > 0)
  @IsOptional()
  @Match(UpdateUserDto, (field) => field.password, { message: 'Passwords do not match' })
  confirm_password?: string
}
