import { UseCase } from '../../../../core/definitions/use-case';
import { CharacterRepository } from '../character-repository';
import { HealCharacterInput } from './healCharacter.input';
import { HealCharacterOutput } from './healCharacter.output';

export class HealCharacter implements UseCase {
  constructor(private readonly repository: CharacterRepository) {

  }

  async execute(input: HealCharacterInput): Promise<HealCharacterOutput> {

    const character = await this.repository.get(input.name);
    if (character.alive) {
      const updated = await this.repository.updateHealth(character.name, HealCharacter.getNewHealth(character.health, input));
      return {
        character: updated,
        success: true
      };
    } else {
      return {
        success: false,
        character: character,
        error: 'character_is_dead_cannot_heal_it'
      };
    }

  }


  private static getNewHealth(health: number, input: HealCharacterInput) {
    const newHealth = health + input.pv;
    return newHealth > 1000 ? 1000 : newHealth;
  }
}
