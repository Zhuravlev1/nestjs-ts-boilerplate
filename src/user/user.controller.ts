import { Post, Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from './dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ApiException } from '../shared';

@ApiBearerAuth()
@ApiTags('user')
@Controller('users')
export class UserController {
  // private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {
  }

  @Post()
  @ApiInternalServerErrorResponse({ type: ApiException })
  @ApiForbiddenResponse({ type: ApiException })
  @ApiNotFoundResponse({ type: ApiException })
  @ApiOkResponse({ type: UserDto })
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }
}
