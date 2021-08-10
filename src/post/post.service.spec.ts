import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WritingRepository } from 'src/entity/repository/writing.repository';
import { Writing } from 'src/entity/writing.entity';
import { PostService } from './post.service';
import * as faker from 'faker';
import { Application } from 'src/entity/application.entity';
import { Comment } from 'src/entity/comment.entity';
import { Heart } from 'src/entity/heart.entity';
import { User } from 'src/entity/user.entity';
import { UserRepository } from 'src/entity/repository/user.repository';
import { UpdateWriting } from 'src/entity/writing_dto/updateWriting.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

// jest.mock('jsonwebtoken', () => {
//   return {
//     sign: jest.fn(() => 'TOKEN'),
//     verify: jest.fn(() => 'verify'),
//   };
// });

class WritingMockRepository{
  public find():Writing[]{
    return new Array<Writing>();
  }

  public findOne(id:string):Writing{
    const writing:Writing = new Writing();

    writing.id = 1;
    writing.title = faker.name.title();
    writing.content = faker.lorem.text();
    writing.period = faker.date.future();
    writing.personnel = 5;
    writing.category = faker.lorem.words(3);
    writing.imagePath = faker.system.directoryPath();
    writing.createdAt = faker.date.recent();
    writing.updatedAt = faker.date.recent();
    writing.applications = new Array<Application>();
    writing.comments = new Array<Comment>();
    writing.hearts = new Array<Heart>();

    return writing;
  }

  public update(id:string, updateWriting:UpdateWriting):UpdateResult{
    return new UpdateResult();
  }

  public delete(id:string):DeleteResult{
    return new DeleteResult();
  }
}

class UserMockRepository{
  public findOne(id:string):User{
    const user:User = new User();

    user.id = Number(id);
    user.nick = faker.name.firstName();
    user.email = faker.internet.email();
    user.password = faker.lorem.word();
    user.imagePath = faker.system.directoryPath();
    user.writings = new Array<Writing>();
    user.comments = new Array<Comment>();
    user.hearts = new Array<Heart>();
    user.applications = new Array<Application>();

    return user;
  }
}

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {provide:getRepositoryToken(WritingRepository), useClass:WritingMockRepository},
        {provide: getRepositoryToken(UserRepository), useClass: UserMockRepository}
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find', ()=>{
    it('findOne', async ()=>{
      const writing:Writing = await service.findOne('1');
      expect(writing).toBeInstanceOf(Writing);
    });

    it('findAll', async ()=>{
      const writings:Writing[] = await service.findAll();
      expect(writings).toBeInstanceOf(Array<Writing>());
    });
  })

  // describe('create', ()=>{
  //   it('create', async ()=>{

  //     const token:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJ1c2VyX2VtYWlsIjoibmF2ZXJAbmF2ZXIuY29vbSIsImlhdCI6MTYyODU3NzkxNCwiZXhwIjoxNjI4NTc4NTE0LCJpc3MiOiJTZXJ2ZXIifQ.amRCKVPQnGdoPG9udT3lZqDnD-Z7CxSSeoXL-iRfAKg";

  //     const writing:Writing = new Writing();

  //     writing.id = 1;
  //     writing.title = faker.name.title();
  //     writing.content = faker.lorem.text();
  //     writing.period = faker.date.future();
  //     writing.personnel = 5;
  //     writing.category = faker.lorem.words(3);
  //     writing.imagePath = faker.system.directoryPath();
  //     writing.createdAt = faker.date.recent();
  //     writing.updatedAt = faker.date.recent();
  //     writing.applications = new Array<Application>();
  //     writing.comments = new Array<Comment>();
  //     writing.hearts = new Array<Heart>();

  //     service.create(token, new File(), writing)
  //   })
  // })

  describe("update", ()=>{
    it("update", async ()=>{
      const id:string = "1";
      const updateWriting:UpdateWriting = new UpdateWriting();

      updateWriting.title = faker.lorem.words(3);
      updateWriting.content = faker.lorem.lines();
      updateWriting.personnel = 10;

      const result:UpdateResult = await service.update(id, updateWriting);
      expect(result).toBeInstanceOf(UpdateResult);
    });
  });

  describe("delete", ()=>{
    it("delete", async ()=>{
      const id:string = "1";

      const result:DeleteResult = await service.delete(id);
      expect(result).toBeInstanceOf(DeleteResult);
    });
  })
});
