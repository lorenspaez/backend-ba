import { Module } from '@nestjs/common';
import { AlertElementController } from './alertElement.controller';
import { AlertElementService } from './alertElement.service';

@Module({
  controllers: [AlertElementController],
  providers: [AlertElementService],
})
export class AlertElementModule {}
