import { Entity, Column } from 'typeorm';
import { IsEmail } from 'class-validator';
import { BaseEntity } from '../shared';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;
}
