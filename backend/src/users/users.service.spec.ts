import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
    };

    it('should successfully create a user', async () => {
      const hashedPassword = 'hashedPassword';
      const savedUser = {
        id: '1',
        ...createUserDto,
        password: hashedPassword,
        role: UserRole.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserRepository.findOne.mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve(hashedPassword as never));
      mockUserRepository.create.mockReturnValue(savedUser);
      mockUserRepository.save.mockResolvedValue(savedUser);

      const result = await service.create(createUserDto);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: createUserDto.email },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        ...createUserDto,
        password: hashedPassword,
      });
      expect(mockUserRepository.save).toHaveBeenCalled();
      expect(result).toEqual(savedUser);
      expect(result.password).not.toEqual(createUserDto.password);
    });

    it('should throw ConflictException if user already exists', async () => {
      const existingUser = {
        id: '1',
        email: createUserDto.email,
        password: 'hashedPassword',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserRepository.findOne.mockResolvedValue(existingUser);

      await expect(service.create(createUserDto)).rejects.toThrow(ConflictException);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: createUserDto.email },
      });
      expect(mockUserRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('findByEmail', () => {
    it('should return a user if found', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.findByEmail('test@example.com');

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      const result = await service.findByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });
  });

  describe('findById', () => {
    it('should return a user if found', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.findById('1');

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.findById('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('validatePassword', () => {
    const user: User = {
      id: '1',
      email: 'test@example.com',
      password: 'hashedPassword',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should return true for valid password', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true as never));

      const result = await service.validatePassword(user, 'correctPassword');

      expect(bcrypt.compare).toHaveBeenCalledWith('correctPassword', user.password);
      expect(result).toBe(true);
    });

    it('should return false for invalid password', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false as never));

      const result = await service.validatePassword(user, 'wrongPassword');

      expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', user.password);
      expect(result).toBe(false);
    });
  });
});
