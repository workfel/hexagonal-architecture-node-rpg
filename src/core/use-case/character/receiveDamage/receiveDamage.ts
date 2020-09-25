import { UseCase } from '../../../domain/shared-kernel/definitions/use-case';
import { ReceiveDamageInput } from './receiveDamage.input';
import { ReceiveDamageOutput } from './receiveDamage.output';
import { CharacterRepository } from '../../../domain/character/character-repository';
import { Character } from '../../../domain/character/entity/character';
import { ReceiveDamageCalculator } from '../../../domain/character/entity/receive-damage-calculator';
import { ReceiveDamageValidator } from '../../../domain/character/entity/receive-damage-validator';

export class ReceiveDamage implements UseCase {
  constructor(private readonly repository: CharacterRepository) {

  }

  async execute({ damage, receiver, attacker }: ReceiveDamageInput): Promise<ReceiveDamageOutput> {
    if (!ReceiveDamageValidator.validate(receiver, attacker)) {
      return this.cantDamageItself(receiver);
    }

    const newHealth = ReceiveDamageCalculator.computeNewHealth(receiver, attacker, damage);
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
}
