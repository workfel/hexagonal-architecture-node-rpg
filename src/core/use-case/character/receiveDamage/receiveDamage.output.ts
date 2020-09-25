import { Output } from '../../../domain/shared-kernel/entity/output';
import { Character } from '../../../domain/character/entity/character';

export interface ReceiveDamageOutput extends Output {
  character: Character;
}
