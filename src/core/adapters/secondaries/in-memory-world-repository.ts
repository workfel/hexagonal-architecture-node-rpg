import { WorldRepository } from '../../domain/world/world.repository';
import { World } from '../../domain/world/entity/world';
import { Character } from '../../domain/character/entity/character';
import { CharacterPosition } from '../../domain/world/entity/character-position';
import { Position } from '../../domain/world/entity/position';

export class InMemoryWorldRepository implements WorldRepository {
  _world: World;

  create(newWorld: World): void {
    this._world = newWorld;
  }

  placeCharacter(character: Character, position: Position): void {
    this._world.placeCharacter(character, position);
  }

  getCharacterPosition(characterName: string): Promise<CharacterPosition> {
    return Promise.resolve(this._world.getCharacterPosition(characterName));
  }

}
