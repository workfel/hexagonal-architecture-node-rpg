import { Input } from '../../../domain/shared-kernel/entity/input';
import { Character } from '../../../domain/character/entity/character';

export class ReceiveDamageInput implements Input {
  attacker: Character;
  receiver: Character;
  damage: number;
}
