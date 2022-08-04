import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { AlertModule } from './alert/alert.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MassiveModule } from '@nestjsplus/massive';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    OrganizationModule,
    AlertModule,
    AuthModule,
    CategoryModule,
    PostModule,
    PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
