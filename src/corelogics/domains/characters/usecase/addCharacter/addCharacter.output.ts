import { Output } from '../../../../core/entity/output';
import { Character } from '../../entity/character';

export interface AddCharacterOutput extends Output {
  character: Character;
}
