import { UseCase } from '../../../domain/shared-kernel/definitions/use-case';
import { AddCharacterToWorldOutput } from './addCharacterToWorld.output';
import { WorldRepository } from '../../../domain/world/world.repository';
import { CharacterRepository } from '../../../domain/character/character-repository';
import { AddCharacterToWorldInput } from './addCharacterToWorld.input';

export class AddCharacterToWorld implements UseCase {
  constructor(private readonly repository: WorldRepository, private readonly characterRepository: CharacterRepository) {

  }

  async execute(input: AddCharacterToWorldInput): Promise<AddCharacterToWorldOutput> {
    const character = await this.characterRepository.get(input.characterName);
    await this.repository.placeCharacter(character, input.position);
    return {
      success: true,
      position: input.position
    };
  }

}
