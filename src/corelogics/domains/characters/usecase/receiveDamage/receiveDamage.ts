import { UseCase } from '../../../../core/definitions/use-case';
import { ReceiveDamageInput } from './receiveDamage.input';
import { ReceiveDamageOutput } from './receiveDamage.output';
import { CharacterRepository } from '../character-repository';

export class ReceiveDamage implements UseCase {
  constructor(private readonly repository: CharacterRepository) {

  }

  async execute({ damage, receiver, attacker }: ReceiveDamageInput): Promise<ReceiveDamageOutput> {
    if (receiver.name === attacker.name) {
      return {
        success: false,
        error: 'cannot_deal_damage_to_itself',
        character: receiver
      };
    }
    const newHealth = this.computeHealth(receiver.health, damage);
    if (newHealth <= 0) {
      await this.repository.die(receiver.name);
    }
    const characterUpdated = await this.repository.updateHealth(receiver.name, newHealth);
    return {
      character: characterUpdated,
      success: true
    };
  }

  private computeHealth(health: number, damage: number) {
    let newHealth = health - damage;
    if (newHealth < 0) {
      newHealth = 0;
    }
    return newHealth;
  }
}
