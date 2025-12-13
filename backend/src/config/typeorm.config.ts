import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Sweet } from '../sweets/entities/sweet.entity';

export const typeOrmConfig = (): TypeOrmModuleOptions => {
  // Use DATABASE_URL if available (common in production environments like Render, Heroku)
  if (process.env.DATABASE_URL) {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Sweet],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV === 'development',
      ssl: {
        rejectUnauthorized: false, // Required for most cloud PostgreSQL providers
      },
    };
  }

  // Fallback to individual environment variables for local development
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'sweet_shop',
    entities: [User, Sweet],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
  };
};
