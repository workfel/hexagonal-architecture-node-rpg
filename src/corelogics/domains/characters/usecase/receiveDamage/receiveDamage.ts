import { UseCase } from '../../../../core/definitions/use-case';
import { ReceiveDamageInput } from './receiveDamage.input';
import { ReceiveDamageOutput } from './receiveDamage.output';
import { CharacterRepository } from '../character-repository';

export class ReceiveDamage implements UseCase {
  constructor(private readonly repository: CharacterRepository) {

  }

  async execute({ damage, character }: ReceiveDamageInput): Promise<ReceiveDamageOutput> {
    const newHealth = this.computeHealth(character.health, damage);
    if (newHealth <= 0) {
      await this.repository.die(character.name);
    }
    const characterUpdated = await this.repository.updateHealth(character.name, newHealth);
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
