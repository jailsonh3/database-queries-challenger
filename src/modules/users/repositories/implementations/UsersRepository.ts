import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.findOne({
      where: {
        id: user_id,
      },
      relations: ["games"]
    })

    return user as User;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query("SELECT * FROM users ORDER BY first_name ASC"); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const query = `SELECT * FROM users WHERE LOWER(first_name) LIKE LOWER('%${first_name}%') AND LOWER(last_name) LIKE LOWER('%${last_name}%')`
    return await this.repository.query(query); // Complete usando raw query
  }
}
