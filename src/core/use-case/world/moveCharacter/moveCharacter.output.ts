import { Output } from '../../../domain/shared-kernel/entity/output';
import { CharacterPosition } from '../../../domain/world/entity/character-position';

export interface MoveCharacterOutput extends Output {
  character: CharacterPosition;
}
