import { Output } from '../../../../core/entity/output';
import { Character } from '../../entity/character';

export interface HealCharacterOutput extends Output {
  character: Character;
}
