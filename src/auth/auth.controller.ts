import { Body,Controller,HttpCode,HttpStatus,Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
