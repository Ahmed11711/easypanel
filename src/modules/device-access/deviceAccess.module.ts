import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './entity/device.entity';
import { DeviceController } from './controller/device.controller';
import { DeviceService } from './service/device.service';
import { HashService } from 'src/common/HashingData/hash.service';
import { AuthGateway } from 'src/common/WebSocket/test';

@Module({
  imports: [
    TypeOrmModule.forFeature([Device]),

  ],
  controllers: [DeviceController],
  providers: [DeviceService, HashService, AuthGateway],
  exports: [DeviceService],
})
export class DeviceModule {}
