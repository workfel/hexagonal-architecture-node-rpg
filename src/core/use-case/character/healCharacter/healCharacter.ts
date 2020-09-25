import { UseCase } from '../../../domain/shared-kernel/definitions/use-case';
import { CharacterRepository } from '../../../domain/character/character-repository';
import { HealCharacterInput } from './healCharacter.input';
import { HealCharacterOutput } from './healCharacter.output';
import { CharacterHealCalculator } from '../../../domain/character/entity/character-heal-calculator';

export class HealCharacter implements UseCase {
  constructor(private readonly repository: CharacterRepository) {

  }

  async execute(input: HealCharacterInput): Promise<HealCharacterOutput> {

    const character = await this.repository.get(input.name);
    if (character.alive) {
      const updated = await this.repository.updateHealth(character.name, CharacterHealCalculator.heal(character, input.pv));
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
}
