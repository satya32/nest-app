import { Test, TestingModule } from '@nestjs/testing';
import { StudantsManagemantsService } from './studants-managemants.repository';

describe('StudantsManagemantsService', () => {
  let service: StudantsManagemantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudantsManagemantsService],
    }).compile();

    service = module.get<StudantsManagemantsService>(StudantsManagemantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
