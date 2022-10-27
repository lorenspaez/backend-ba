import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';

@Module({
  imports: [HttpModule],
  controllers: [AlertController],
  providers: [AlertService]
})
export class AlertModule {}
