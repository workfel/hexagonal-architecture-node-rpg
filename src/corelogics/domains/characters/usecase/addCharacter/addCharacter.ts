import { UseCase } from '../../../../core/definitions/use-case';
import { CharacterRepository } from '../character-repository';
import { AddCharacterInput } from './addCharacter.input';
import { AddCharacterOutput } from './addCharacter.output';
import { createCharacter } from '../../entity/character';

export class AddCharacter implements UseCase {
  constructor(private readonly repository: CharacterRepository) {

  }

  async execute(input: AddCharacterInput): Promise<AddCharacterOutput> {
    const create = createCharacter(input.name);

    const characterAlreadyExist = await this.repository.isExists(input.name);
    if (characterAlreadyExist) {
      return {
        success: false,
        error: 'characterAlreadyExist',
        character: undefined
      };
    }

    await this.repository.create(create);
    return {
      character: create,
      success: true,
    };
  }


}