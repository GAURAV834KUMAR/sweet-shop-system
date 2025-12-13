import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { User } from '../users/entities/user.entity';
import { Sweet } from '../sweets/entities/sweet.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
  ) {}

  async create(user: User, sweet: Sweet, quantity: number): Promise<Purchase> {
    const purchase = this.purchasesRepository.create({
      user,
      sweet,
      quantity,
      priceAtPurchase: sweet.price,
      totalAmount: sweet.price * quantity,
    });

    return this.purchasesRepository.save(purchase);
  }

  async findByUserId(userId: string): Promise<Purchase[]> {
    return this.purchasesRepository.find({
      where: { user: { id: userId } },
      order: { purchasedAt: 'DESC' },
    });
  }

  async findAll(): Promise<Purchase[]> {
    return this.purchasesRepository.find({
      order: { purchasedAt: 'DESC' },
    });
  }

  async getUserStatistics(userId: string) {
    const purchases = await this.findByUserId(userId);
    
    const totalSpent = purchases.reduce((sum, p) => sum + Number(p.totalAmount), 0);
    const totalItems = purchases.reduce((sum, p) => sum + p.quantity, 0);
    const uniqueSweets = new Set(purchases.map(p => p.sweet.id)).size;

    return {
      totalPurchases: purchases.length,
      totalSpent,
      totalItems,
      uniqueSweets,
      recentPurchases: purchases.slice(0, 5),
    };
  }
}
