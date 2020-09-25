import { Character } from './character';

export class ReceiveDamageCalculator {

  static computeNewHealth(receiver: Character, attacker: Character, damage: number): number {
    if (receiver.level >= attacker.level + 5) {
      damage = damage * 0.5; // reduce by 50%
    } else if (receiver.level <= attacker.level - 5) {
      damage = damage + (damage * 0.5); // increase by 50%
    }
    let newHealth = receiver.pv - damage;
    if (newHealth < 0) {
      newHealth = 0;
    }
    return newHealth;
  }
}
