import { Input } from '../../../domain/shared-kernel/entity/input';
import { CharacterType } from '../../../domain/character/entity/character';

export interface AddCharacterInput extends Input {
  name: string;
  type: CharacterType
}
