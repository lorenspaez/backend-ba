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
    MassiveModule.register({
      user: process.env.POSTGRES_USERNAME || '<local-postgres-user>',
      password: process.env.POSTGRES_PASSWORD || '<local-postgres-password>',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: 5432,
      database: process.env.POSTGRES_DATABASE ||'<local-postgres-db-name>'
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
