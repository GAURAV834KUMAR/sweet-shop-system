import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { SweetsService } from './sweets.service';
import { Sweet } from './entities/sweet.entity';
import { CreateSweetDto } from './dto/create-sweet.dto';
import { UpdateSweetDto } from './dto/update-sweet.dto';
import { SearchSweetDto } from './dto/search-sweet.dto';
import { PurchaseSweetDto } from './dto/purchase-sweet.dto';
import { RestockSweetDto } from './dto/restock-sweet.dto';

describe('SweetsService', () => {
  let service: SweetsService;
  let repository: Repository<Sweet>;

  const mockSweetRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SweetsService,
        {
          provide: getRepositoryToken(Sweet),
          useValue: mockSweetRepository,
        },
      ],
    }).compile();

    service = module.get<SweetsService>(SweetsService);
    repository = module.get<Repository<Sweet>>(getRepositoryToken(Sweet));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a sweet', async () => {
      const createSweetDto: CreateSweetDto = {
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 2.99,
        quantity: 100,
        description: 'Delicious milk chocolate',
      };

      const savedSweet = {
        id: '1',
        ...createSweetDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockSweetRepository.create.mockReturnValue(savedSweet);
      mockSweetRepository.save.mockResolvedValue(savedSweet);

      const result = await service.create(createSweetDto);

      expect(mockSweetRepository.create).toHaveBeenCalledWith(createSweetDto);
      expect(mockSweetRepository.save).toHaveBeenCalled();
      expect(result).toEqual(savedSweet);
    });
  });

  describe('findAll', () => {
    it('should return an array of sweets', async () => {
      const sweets = [
        {
          id: '1',
          name: 'Chocolate Bar',
          category: 'Chocolate',
          price: 2.99,
          quantity: 100,
          description: 'Delicious chocolate',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Gummy Bears',
          category: 'Candy',
          price: 1.99,
          quantity: 50,
          description: 'Fruity gummy bears',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockSweetRepository.find.mockResolvedValue(sweets);

      const result = await service.findAll();

      expect(mockSweetRepository.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
      });
      expect(result).toEqual(sweets);
      expect(result).toHaveLength(2);
    });

    it('should return an empty array if no sweets exist', async () => {
      mockSweetRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a sweet by id', async () => {
      const sweet = {
        id: '1',
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 2.99,
        quantity: 100,
        description: 'Delicious chocolate',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockSweetRepository.findOne.mockResolvedValue(sweet);

      const result = await service.findOne('1');

      expect(mockSweetRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(sweet);
    });

    it('should throw NotFoundException if sweet not found', async () => {
      mockSweetRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
      await expect(service.findOne('999')).rejects.toThrow(
        'Sweet with ID "999" not found'
      );
    });
  });

  describe('search', () => {
    it('should search sweets by name', async () => {
      const searchDto: SearchSweetDto = { name: 'Chocolate' };
      const sweets = [
        {
          id: '1',
          name: 'Chocolate Bar',
          category: 'Chocolate',
          price: 2.99,
          quantity: 100,
          description: 'Delicious chocolate',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockSweetRepository.find.mockResolvedValue(sweets);

      const result = await service.search(searchDto);

      expect(result).toEqual(sweets);
    });

    it('should search sweets by category', async () => {
      const searchDto: SearchSweetDto = { category: 'Candy' };
      mockSweetRepository.find.mockResolvedValue([]);

      await service.search(searchDto);

      expect(mockSweetRepository.find).toHaveBeenCalled();
    });

    it('should search sweets by price range', async () => {
      const searchDto: SearchSweetDto = { minPrice: 1, maxPrice: 5 };
      mockSweetRepository.find.mockResolvedValue([]);

      await service.search(searchDto);

      expect(mockSweetRepository.find).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a sweet', async () => {
      const existingSweet = {
        id: '1',
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 2.99,
        quantity: 100,
        description: 'Delicious chocolate',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updateDto: UpdateSweetDto = {
        price: 3.49,
      };

      mockSweetRepository.findOne.mockResolvedValue(existingSweet);
      mockSweetRepository.save.mockResolvedValue({
        ...existingSweet,
        ...updateDto,
      });

      const result = await service.update('1', updateDto);

      expect(mockSweetRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(mockSweetRepository.save).toHaveBeenCalled();
      expect(result.price).toEqual(3.49);
    });

    it('should throw NotFoundException if sweet does not exist', async () => {
      mockSweetRepository.findOne.mockResolvedValue(null);

      await expect(service.update('999', { price: 5.99 })).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('remove', () => {
    it('should delete a sweet', async () => {
      const sweet = {
        id: '1',
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 2.99,
        quantity: 100,
        description: 'Delicious chocolate',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockSweetRepository.findOne.mockResolvedValue(sweet);
      mockSweetRepository.remove.mockResolvedValue(sweet);

      await service.remove('1');

      expect(mockSweetRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(mockSweetRepository.remove).toHaveBeenCalledWith(sweet);
    });

    it('should throw NotFoundException if sweet does not exist', async () => {
      mockSweetRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('purchase', () => {
    it('should purchase a sweet and decrease quantity', async () => {
      const sweet = {
        id: '1',
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 2.99,
        quantity: 100,
        description: 'Delicious chocolate',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const purchaseDto: PurchaseSweetDto = { quantity: 10 };

      mockSweetRepository.findOne.mockResolvedValue(sweet);
      mockSweetRepository.save.mockResolvedValue({
        ...sweet,
        quantity: 90,
      });

      const result = await service.purchase('1', purchaseDto);

      expect(result.quantity).toBe(90);
      expect(mockSweetRepository.save).toHaveBeenCalled();
    });

    it('should throw BadRequestException if insufficient stock', async () => {
      const sweet = {
        id: '1',
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 2.99,
        quantity: 5,
        description: 'Delicious chocolate',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const purchaseDto: PurchaseSweetDto = { quantity: 10 };

      mockSweetRepository.findOne.mockResolvedValue(sweet);

      await expect(service.purchase('1', purchaseDto)).rejects.toThrow(
        BadRequestException
      );
      await expect(service.purchase('1', purchaseDto)).rejects.toThrow(
        'Insufficient stock. Only 5 items available.'
      );
    });
  });

  describe('restock', () => {
    it('should restock a sweet and increase quantity', async () => {
      const sweet = {
        id: '1',
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 2.99,
        quantity: 10,
        description: 'Delicious chocolate',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const restockDto: RestockSweetDto = { quantity: 50 };

      mockSweetRepository.findOne.mockResolvedValue(sweet);
      mockSweetRepository.save.mockResolvedValue({
        ...sweet,
        quantity: 60,
      });

      const result = await service.restock('1', restockDto);

      expect(result.quantity).toBe(60);
      expect(mockSweetRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if sweet does not exist', async () => {
      mockSweetRepository.findOne.mockResolvedValue(null);

      await expect(service.restock('999', { quantity: 50 })).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
