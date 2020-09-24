import { UseCase } from '../../../../core/definitions/use-case';
import { ReceiveDamageInput } from './receiveDamage.input';
import { ReceiveDamageOutput } from './receiveDamage.output';
import { CharacterRepository } from '../character-repository';
import { Character } from '../../entity/character';

export class ReceiveDamage implements UseCase {
  constructor(private readonly repository: CharacterRepository) {

  }

  async execute({ damage, receiver, attacker }: ReceiveDamageInput): Promise<ReceiveDamageOutput> {
    if (receiver.name === attacker.name) {
      return this.cantDamageItself(receiver);
    }

    const newHealth = this.computeHealth(receiver, attacker, damage);
    if (newHealth <= 0) {
      await this.repository.die(receiver.name);
    }
    const characterUpdated = await this.repository.updateHealth(receiver.name, newHealth);
    return {
      character: characterUpdated,
      success: true
    };
  }

  private cantDamageItself(receiver: Character) {
    return {
      success: false,
      error: 'cannot_deal_damage_to_itself',
      character: receiver
    };
  }

  private computeHealth(receiver: Character, attacker: Character, damage: number) {
    if (receiver.level >= attacker.level + 5) {
      damage = damage * 0.5; // reduce by 50%
    } else if (receiver.level <= attacker.level - 5) {
      damage = damage + (damage * 0.5); // increase by 50%
    }
    let newHealth = receiver.health - damage;
    if (newHealth < 0) {
      newHealth = 0;
    }
    return newHealth;
  }


}
