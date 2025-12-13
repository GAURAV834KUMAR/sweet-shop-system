import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
@UseGuards(JwtAuthGuard)
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Get()
  async getMyPurchases(@Request() req: any) {
    return this.purchasesService.findByUserId(req.user.id);
  }

  @Get('statistics')
  async getMyStatistics(@Request() req: any) {
    return this.purchasesService.getUserStatistics(req.user.id);
  }
}
