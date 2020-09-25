import { UseCase } from '../../../domain/shared-kernel/definitions/use-case';
import { WorldRepository } from '../../../domain/world/world.repository';
import { CharacterRepository } from '../../../domain/character/character-repository';
import { MoveCharacterInput } from './moveCharacter.input';
import { MoveCharacterOutput } from './moveCharacter.output';
import { CharacterPosition } from '../../../domain/world/entity/character-position';
import { Move } from '../../../domain/world/entity/move';

export class MoveCharacter implements UseCase {
  constructor(private readonly repository: WorldRepository, private readonly characterRepository: CharacterRepository) {

  }

  async execute(input: MoveCharacterInput): Promise<MoveCharacterOutput> {

    const characterPosition: CharacterPosition = await this.repository.getCharacterPosition(input.characterName);

    if (input.move === Move.left) {
      characterPosition.position.x++;
    }
    if (input.move === Move.down) {
      characterPosition.position.y++;
    }

    return Promise.resolve({
      character: characterPosition,
      success: true
    });
  }

}
