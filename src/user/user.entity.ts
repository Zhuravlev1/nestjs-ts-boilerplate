import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany, Index } from 'typeorm';
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

  @Column({select: false,  nullable: true})
  password: string;

  @Index()
  @Column({select: false,  nullable: true})
  facebookId: string;

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
