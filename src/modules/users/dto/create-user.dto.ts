import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator'
import { Match } from 'decorators/match.decorator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  first_name?: string

  @ApiProperty({ required: false })
  @IsOptional()
  last_name?: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  role_id: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[A-Za-z])[A-Za-z\d@#$%^&*+=:;{}[\]\\|,.!?'"()\-_\s]{6,}$/, {
    message: 'Geslo mora vsebovati vsaj eno številko, vsaj eno črko in biti dolgo vsaj 6 znakov.',
  })
  password: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Match(CreateUserDto, (field) => field.password, { message: 'Passwords do not match' })
  confirm_password: string
}
