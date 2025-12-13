import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SweetsService } from './sweets.service';
import { CreateSweetDto } from './dto/create-sweet.dto';
import { UpdateSweetDto } from './dto/update-sweet.dto';
import { SearchSweetDto } from './dto/search-sweet.dto';
import { PurchaseSweetDto } from './dto/purchase-sweet.dto';
import { RestockSweetDto } from './dto/restock-sweet.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('sweets')
@UseGuards(JwtAuthGuard)
export class SweetsController {
  constructor(private readonly sweetsService: SweetsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createSweetDto: CreateSweetDto) {
    return this.sweetsService.create(createSweetDto);
  }

  @Get()
  async findAll() {
    return this.sweetsService.findAll();
  }

  @Get('search')
  async search(@Query() searchDto: SearchSweetDto) {
    return this.sweetsService.search(searchDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sweetsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() updateSweetDto: UpdateSweetDto) {
    return this.sweetsService.update(id, updateSweetDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.sweetsService.remove(id);
  }

  @Post(':id/purchase')
  async purchase(@Param('id') id: string, @Body() purchaseDto: PurchaseSweetDto) {
    return this.sweetsService.purchase(id, purchaseDto);
  }

  @Post(':id/restock')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async restock(@Param('id') id: string, @Body() restockDto: RestockSweetDto) {
    return this.sweetsService.restock(id, restockDto);
  }
}
