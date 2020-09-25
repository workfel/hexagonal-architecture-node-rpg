import { Character } from './character';

export class ReceiveDamageValidator {

  static validate(receiver: Character, attacker: Character): boolean {
    return receiver.name !== attacker.name;
  }
}
