import { ISession } from '../sessions/sessions.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Sessions implements ISession {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    default: '',
  })
  refreshToken: string;

  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => Users, (users: Users) => users.id)
  public user: Users;
}
