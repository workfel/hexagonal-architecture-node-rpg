import { Output } from '../../../domain/shared-kernel/entity/output';
import { Character } from '../../../domain/character/entity/character';

export interface HealCharacterOutput extends Output {
  character: Character;
}
