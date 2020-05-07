import { Column, Entity, ManyToOne, Index } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BaseEntity } from '../shared';

@Entity('token')
export class TokenEntity extends BaseEntity {
  @Index()
  @Column({ type: 'int' })
  userId: number;

  @Index()
  @Column({ type: 'varchar' })
  accessToken: string;

  @Column({ type: 'varchar' })
  refreshToken: string;

  @Column({ type: 'varchar', default: null })
  osVersion: string;

  @Column({ type: 'varchar', default: null })
  appVersion: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  tokenDevice: string;

  @ManyToOne(type => UserEntity, user => user.tokens, { onDelete: 'CASCADE' })
  user: UserEntity;
}
