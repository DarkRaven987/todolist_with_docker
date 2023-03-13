import { IUsers } from '../users/users.interface';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sessions } from './sessions.entity';

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

  @OneToMany(() => Sessions, (session: Sessions) => session.id)
  @JoinColumn({ name: 'userId' })
  public sessions: Sessions;
}
