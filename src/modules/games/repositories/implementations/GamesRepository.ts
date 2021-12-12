import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {

    const title = param;

    return await this.repository
      .createQueryBuilder("games").where(`LOWER(title) LIKE '%' || LOWER(:title) || '%' `, { title }).getMany();
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query('SELECT COUNT(games) FROM games'); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {

    return await getRepository(User)
                  .createQueryBuilder('user')
                  .leftJoin('user.games', 'game')
                  .where('game.id = :id', {id})
                  .getMany();

      // Complete usando query builder
  }
}
