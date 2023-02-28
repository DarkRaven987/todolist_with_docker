import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUsersDto {
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
