import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator'
import { Match } from 'decorators/match.decorator'

export class CreateUserDto {
  @IsOptional()
  first_name?: string
  @IsOptional()
  last_name?: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  role_id: string

  @IsNotEmpty()
  @Matches(/^(?=.*\d)[A-Za-z.\s_-]+[\W@#$%^&*+=:{}/\\|;:!?.'"()\[\]~]{6,}$/, {
    message: 'Geslo mora vsebovati vsaj eno številko, dovoljena posebna znamenja in biti dolgo vsaj 6 znakov.',
  })
  password: string

  @IsNotEmpty()
  @Match(CreateUserDto, (field) => field.password, { message: 'Passwords do not match' })
  confirm_password: string
}
