import { Module } from '@nestjs/common';
import { MemberController } from './members/member.controller';
import { MembersController } from './members/members.controller';
import { MembersService } from './members/members.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/entities'],
      entitiesTs: ['./src/entities'],
      // autoLoadEntities: true,
      dbName: 'membersDb.sqlite3',
      type: 'sqlite',
    }),
  ],
  controllers: [MemberController, MembersController],
  providers: [MembersService],
})
export class AppModule { }
