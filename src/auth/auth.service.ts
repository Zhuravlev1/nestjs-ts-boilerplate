import { Injectable } from '@nestjs/common';
import { LoginUserDto, UserDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    // @InjectRepository(TokenEntity)
    // protected readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<UserDto | null> {
    const user = await this.userService.findByEmailAndPassword(loginUserDto);
    return user ? user : null;
  }

  async login(user: UserDto) {
    const payload = { username: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

}
