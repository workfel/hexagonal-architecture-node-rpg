import { World } from './entity/world';
import { Character } from '../character/entity/character';
import { CharacterPosition } from './entity/character-position';
import { Position } from './entity/position';

export interface WorldRepository {

  create(newWorld: World): void;

  placeCharacter(character: Character, position: Position): void;

  getCharacterPosition(characterName: string): Promise<CharacterPosition>;
}
