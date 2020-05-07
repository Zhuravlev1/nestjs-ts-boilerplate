import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto, UserDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from '../token/token.entity';
import { Repository } from 'typeorm';
import { jwtConstants } from './constants';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { TokenPayload } from './interfaces/tokenPayload';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(TokenEntity)
    protected readonly tokenRepository: Repository<TokenEntity>,
  ) {
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<UserDto | null> {
    const user = await this.userService.findByEmailAndPassword(loginUserDto);
    return user ? user : null;
  }

  async login(user: UserDto) {
    const payload = { username: user.email, sub: user.id };
    const { accessToken, refreshToken } = this.generateAccessAndRefreshToken(payload);

    await this.tokenRepository.save({ userId: user.id, accessToken, refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(accessToken: string) {
    await this.tokenRepository.delete({ accessToken });
  }

  async validateToken(accessToken: string) {
    const isTokenExist = await this.tokenRepository.findOne({ accessToken });

    if (isTokenExist) {
      return;
    }

    throw new HttpException(
      { message: 'Unauthorized' },
      HttpStatus.UNAUTHORIZED,
    );
  }

  async refreshToken(refreshToken: string, userId: number, email: string) {
    const tokenEntity = await this.tokenRepository.findOne(
      { refreshToken, userId },
    );

    if (tokenEntity) {
      const { accessToken, refreshToken } = this.generateAccessAndRefreshToken({ username: email, sub: userId });

      tokenEntity.accessToken = accessToken;
      tokenEntity.refreshToken = refreshToken;
      await this.tokenRepository.save(tokenEntity);

      return { accessToken, refreshToken };
    }

    throw new HttpException(
      { message: 'Unauthorized' },
      HttpStatus.UNAUTHORIZED,
    );
  }

  private generateAccessAndRefreshToken(payload: TokenPayload) {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(
      payload,
      { expiresIn: jwtConstants.refreshTokenExpiresIn },
    );

    return { accessToken, refreshToken };
  }
}
