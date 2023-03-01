import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Todos } from './todos.entity';

@Entity()
export class TodosStatusEnum {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @OneToMany(() => Todos, (todo: Todos) => todo.id)
  @JoinColumn({ name: 'statusId' })
  public todos: Todos;
}
