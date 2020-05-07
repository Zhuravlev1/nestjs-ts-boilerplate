import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import { BaseEntity } from '../shared';
import { createHmac } from 'crypto';
import { TokenEntity } from '../token/token.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({select: false})
  password: string;

  @OneToMany(type => TokenEntity, token => token.user)
  tokens: TokenEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = createHmac('sha256', this.password).digest('hex');
    }
  }
}
