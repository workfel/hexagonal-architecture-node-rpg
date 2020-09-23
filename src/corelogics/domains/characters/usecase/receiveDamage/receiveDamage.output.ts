import { Output } from '../../../../core/entity/output';
import { Character } from '../../entity/character';

export interface ReceiveDamageOutput extends Output {
  character: Character;
}
