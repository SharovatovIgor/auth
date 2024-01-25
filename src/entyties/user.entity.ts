import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Point,
  PrimaryGeneratedColumn,
} from 'typeorm';

import * as argon2 from 'argon2';

import { Gender } from '../user/types';
import { Post } from './post.entity';
import { Company } from './company.entity';
import { Comment } from './comment.entity';
import { Event } from './event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  lastname: string;

  @Column({ type: 'timestamptz' })
  birthday: Date;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.UNKNOW,
  })
  gender: Gender;

  @Column({ type: 'varchar' })
  lastWorkPlace: string;

  @Column({ type: 'varchar' })
  education: string;

  @Column({ type: 'varchar' })
  specific: string;

  @Column({ type: 'point' })
  location: Point | number[] | string;

  @Column({ type: 'varchar' })
  ahubLink: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  language: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'text' })
  aboutMe: string;

  @Column({ type: 'varchar' })
  password: string;

  @ManyToOne(() => Company, (company) => company.user)
  company?: Company;

  @Column({ type: 'int', nullable: true })
  companyId?: number;

  @OneToMany(() => Post, (post) => post.user)
  post?: Post[];

  @OneToMany(() => Comment, (post) => post.user)
  comment?: Comment[];

  @ManyToMany(() => Event)
  event?: Event[];

  @BeforeInsert()
  async updateDates() {
    this.location = `(${this.location[0]}, ${this.location[1]})`;
    this.password = await argon2.hash(this.password, {
      secret: Buffer.from(process.env.SECRET),
    });
  }
}
