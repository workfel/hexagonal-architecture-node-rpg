import { Input } from '../../../../core/entity/input';
import { CharacterType } from '../../entity/character';

export interface AddCharacterInput extends Input {
  name: string;
  type: CharacterType
}
