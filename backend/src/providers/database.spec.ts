import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../modules';
// import { Database } from './database.provider';

describe('Database', () => {
  let provider: DatabaseModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseModule],
    }).compile();

    provider = module.get<DatabaseModule>(DatabaseModule);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
