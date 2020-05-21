import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as FacebookTokenStrategy from 'passport-facebook-token';
import { Profile } from 'passport-facebook-token';
import { UserService } from '../../user/user.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(FacebookTokenStrategy) {
  constructor(
    private readonly userService: UserService,
  ) {
    super({
        clientID: '',
        clientSecret: '',
        fbGraphVersion: '',
      },
    );
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return this.userService.findOrCreateByFacebookId(profile);
  }

}