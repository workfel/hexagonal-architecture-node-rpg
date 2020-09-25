import { Character } from './entity/character';

export interface CharacterRepository {
  create(create: Character): void

  get(name: string): Promise<Character>

  isExists(name: string): Promise<boolean>

  updateHealth(name: string, newHealth: number): Promise<Character>;

  die(name: string): Promise<Character>;
}
