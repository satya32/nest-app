import { Test, TestingModule } from '@nestjs/testing';
import { StudantsManagemantsController } from './studants-managemants.controller';

describe('StudantsManagemantsController', () => {
  let controller: StudantsManagemantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudantsManagemantsController],
    }).compile();

    controller = module.get<StudantsManagemantsController>(StudantsManagemantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
