import { Input } from '../../../../core/entity/input';
import { Character } from '../../entity/character';

export class ReceiveDamageInput implements Input {
  character: Character;
  damage: number;
}
