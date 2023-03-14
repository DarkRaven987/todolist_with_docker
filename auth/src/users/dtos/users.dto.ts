export class CreateUserDto {
  username: string;
  password: string;
}

export class UpdateUserDto {
  userId: number;
  username?: string;
  password?: string;
  refreshToken?: string;
}
