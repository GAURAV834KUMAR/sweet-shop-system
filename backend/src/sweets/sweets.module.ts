import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SweetsController } from './sweets.controller';
import { SweetsService } from './sweets.service';
import { Sweet } from './entities/sweet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sweet])],
  controllers: [SweetsController],
  providers: [SweetsService],
  exports: [SweetsService],
})
export class SweetsModule {}
