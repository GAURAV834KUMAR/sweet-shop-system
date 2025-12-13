import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Sweet } from './entities/sweet.entity';
import { CreateSweetDto } from './dto/create-sweet.dto';
import { UpdateSweetDto } from './dto/update-sweet.dto';
import { SearchSweetDto } from './dto/search-sweet.dto';
import { PurchaseSweetDto } from './dto/purchase-sweet.dto';
import { RestockSweetDto } from './dto/restock-sweet.dto';

@Injectable()
export class SweetsService {
  constructor(
    @InjectRepository(Sweet)
    private readonly sweetRepository: Repository<Sweet>,
  ) {}

  /**
   * Create a new sweet
   */
  async create(createSweetDto: CreateSweetDto): Promise<Sweet> {
    const sweet = this.sweetRepository.create(createSweetDto);
    return this.sweetRepository.save(sweet);
  }

  /**
   * Get all sweets
   */
  async findAll(): Promise<Sweet[]> {
    return this.sweetRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Find sweet by ID
   */
  async findOne(id: string): Promise<Sweet> {
    const sweet = await this.sweetRepository.findOne({ where: { id } });
    
    if (!sweet) {
      throw new NotFoundException(`Sweet with ID "${id}" not found`);
    }

    return sweet;
  }

  /**
   * Search sweets by name, category, or price range
   */
  async search(searchDto: SearchSweetDto): Promise<Sweet[]> {
    const { name, category, minPrice, maxPrice } = searchDto;
    const where: any = {};

    if (name) {
      where.name = Like(`%${name}%`);
    }

    if (category) {
      where.category = Like(`%${category}%`);
    }

    // Handle price range filtering
    if (minPrice !== undefined && maxPrice !== undefined) {
      where.price = Between(minPrice, maxPrice);
    } else if (minPrice !== undefined) {
      where.price = MoreThanOrEqual(minPrice);
    } else if (maxPrice !== undefined) {
      where.price = LessThanOrEqual(maxPrice);
    }

    return this.sweetRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Update a sweet
   */
  async update(id: string, updateSweetDto: UpdateSweetDto): Promise<Sweet> {
    const sweet = await this.findOne(id);

    Object.assign(sweet, updateSweetDto);
    
    return this.sweetRepository.save(sweet);
  }

  /**
   * Delete a sweet (Admin only)
   */
  async remove(id: string): Promise<void> {
    const sweet = await this.findOne(id);
    await this.sweetRepository.remove(sweet);
  }

  /**
   * Purchase a sweet - decreases quantity
   */
  async purchase(id: string, purchaseDto: PurchaseSweetDto): Promise<Sweet> {
    const sweet = await this.findOne(id);

    if (sweet.quantity < purchaseDto.quantity) {
      throw new BadRequestException(
        `Insufficient stock. Only ${sweet.quantity} items available.`
      );
    }

    sweet.quantity -= purchaseDto.quantity;
    return this.sweetRepository.save(sweet);
  }

  /**
   * Restock a sweet - increases quantity (Admin only)
   */
  async restock(id: string, restockDto: RestockSweetDto): Promise<Sweet> {
    const sweet = await this.findOne(id);

    sweet.quantity += restockDto.quantity;
    return this.sweetRepository.save(sweet);
  }
}
