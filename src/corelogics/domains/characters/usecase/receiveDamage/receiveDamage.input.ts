import { Input } from '../../../../core/entity/input';
import { Character } from '../../entity/character';

export class ReceiveDamageInput implements Input {
  attacker: Character;
  receiver: Character;
  damage: number;
}
