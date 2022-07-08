import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AlertModule } from './alert/alert.module';
import { OrganizationModule } from './organization/organization.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UserModule, AlertModule, OrganizationModule, PostModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
