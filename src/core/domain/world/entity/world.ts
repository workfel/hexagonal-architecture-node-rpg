import { Character } from '../../character/entity/character';
import { CharacterPosition } from './character-position';
import { Position } from './position';

export class World {
  constructor(size?: number) {
    this.width = size;
    this.height = size;
  }

  height: number;
  width: number;
  private _characters: CharacterPosition[] = [];

  placeCharacter(character: Character, position: Position) {
    this._characters.push({
      position,
      character
    });
  }

  getCharacterPosition(characterName: string): CharacterPosition {
    return this._characters.find(c => c.character.name === characterName);
  }
}
