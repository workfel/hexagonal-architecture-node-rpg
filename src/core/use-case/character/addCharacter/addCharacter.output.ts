import { Output } from '../../../domain/shared-kernel/entity/output';
import { Character } from '../../../domain/character/entity/character';

export interface AddCharacterOutput extends Output {
  character: Character;
}
