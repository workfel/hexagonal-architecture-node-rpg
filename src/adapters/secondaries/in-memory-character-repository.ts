import { CharacterRepository } from '../../corelogics/domains/characters/usecase/character-repository';
import { Character } from '../../corelogics/domains/characters/entity/character';

export class InMemoryCharacterRepository implements CharacterRepository {
  _characters: Character [] = [];

  create(create: Character): void {
    this._characters.push(create);
  }

  get(name: string): Promise<Character> {
    return Promise.resolve(this.getList().find(c => c.name === name));
  }

  isExists(name: string): Promise<boolean> {
    return Promise.resolve(!!this.getList().find(c => c.name === name));
  }


  async updateHealth(name: string, newHealth: number): Promise<Character> {
    const character = await this.get(name);
    if (character) {
      character.health = newHealth;
    }
    this.update(character);
    return Promise.resolve(character);
  }

  async die(name: string): Promise<Character> {
    const character = await this.get(name);
    character.alive = false;
    character.health = 0;
    this.update(character);
    return character;
  }

  private getList() {
    return this._characters;
  }

  private update(character: Character) {
    this._characters = this._characters.map(c => {
      if (c.name === character.name) {
        c = character;
      }
      return c;
    });
  }
}
