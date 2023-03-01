import { IUsers } from '../users/users.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users implements IUsers {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
    unique: true,
  })
  username: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    default: '',
  })
  refreshToken: string;
}
