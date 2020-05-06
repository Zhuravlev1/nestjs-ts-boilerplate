import { Column, Entity, ManyToOne, Index } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BaseEntity } from '../shared';

@Entity('tokens')
export class TokenEntity extends BaseEntity {
  @Index()
  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'varchar' })
  token: string;

  @Column({ type: 'varchar' })
  refreshToken: string;

  @Index()
  @Column()
  refreshTokenExpiresIn: string;

  @Index()
  @Column()
  expiresIn: string;

  @ManyToOne(type => UserEntity, user => user.tokens, { onDelete: 'CASCADE' })
  user: UserEntity;
}
