import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';

describe('MemberController', () => {
  let controller: MemberController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [MembersService],
    }).compile();

    controller = app.get<MemberController>(MemberController);
  });

  describe('member/:id', () => {
    it('should return "Hello World!"', () => {
      expect(controller.findOne("123")).toBe("something");
    });
  });
});
