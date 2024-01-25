import {
  Column,
  Entity,
  ManyToMany,
  Point,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean' })
  isOpen: boolean;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'boolean' })
  isRepiting: boolean;

  @Column({ type: 'timestamptz' })
  begin: Date;

  @Column({ type: 'timestamptz' })
  end: Date;

  @Column({ type: 'point' })
  location: Point;

  @Column({ type: 'money' })
  price: number;

  @Column({ type: 'int' })
  postId: number;

  @Column({ type: 'int' })
  ownerId: number;

  @ManyToMany(() => User)
  @JoinTable()
  categories: User[];
}
