import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from 'src/entity/repository/user.repository';
import { User } from 'src/entity/user.entity';
import { CreateUser } from 'src/entity/user_dto/createUser.dto';
import { Writing } from 'src/entity/writing.entity';
import { AuthService } from './auth.service';
import * as faker from 'faker';
import * as bcrypt from 'bcrypt';
import { Heart } from 'src/entity/heart.entity';
import { Comment } from 'src/entity/comment.entity';
import { Application } from 'src/entity/application.entity';
import { LoginUser } from 'src/entity/user_dto/loginUser.dto';

class UserMockRepository{
  public save(user:User):User{
    user.id = 1;
    user.writings = new Array<Writing>();
    return user;
  }

  public findOne(id:string){
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

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {provide: getRepositoryToken(UserRepository), useClass: UserMockRepository, }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find', ()=>{
    it('should find a user', async ()=> {
      const user:User = await service.findOne('1');
      expect(user).toBeInstanceOf(User);
    })

    it('should find a user and related to users', async ()=>{
      const user:User = await service.findOneAndRelation('1');
      expect(user).toBeInstanceOf(User);
    })
  })

  describe('create', () => {
    it('should create a user', async () => {

      const nick = faker.lorem.sentence(), email = faker.internet.email(), password = "fake"

      const createUser:CreateUser = {
        nick: nick,
        email: email,
        password: password,
        re_password: password
      }

      const savedUser:User = {
        id: 1,
        nick: nick,
        email: email,
        //hash 시간이 달라서 다르게 나오는 듯, 아마도
        password: await bcrypt.hash(password, 12),
        imagePath: faker.system.directoryPath(),
        writings: new Array<Writing>(),
        comments: new Array<Comment>(),
        hearts: new Array<Heart>(),
        applications: new Array<Application>()
        // createdAt: new Date('2021-07-29T12:24:00'),
        // updatedAt: new Date('2021-07-29T12:24:00')
      }

      const result:User = await service.create(createUser);
      expect(result).toEqual(savedUser);
    });
  });

  describe('login', ()=>{
    it('issue Token', async ()=>{
      const loginUser:LoginUser = new LoginUser();

      loginUser.email = faker.internet.email();
      loginUser.password = faker.lorem.word();

      const result:string = await service.issueToken(loginUser);
      expect(result).toBeInstanceOf(String);
    })
  })
});
