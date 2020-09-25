import { Character } from './character';

export class CharacterHealCalculator {

  static heal(character: Character, newPv: number): number {
    const currPv = character.pv + newPv;
    return currPv > 1000 ? 1000 : currPv;
  }
}
