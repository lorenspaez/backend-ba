import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { AlertModule } from './alert/alert.module';
import { CategoryModule } from './category/category.module';
import { AlertCategoryModule } from './alertCategory/alertCategory.module'
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AlertElementModule } from './alertElement/alertElement.module';
import { SocketsGateway } from './sockets/sockets.gateway';

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
    AlertCategoryModule,
    AlertElementModule,
    PostModule,
    PrismaModule],
  controllers: [],
  providers: [SocketsGateway],
})
export class AppModule {}
