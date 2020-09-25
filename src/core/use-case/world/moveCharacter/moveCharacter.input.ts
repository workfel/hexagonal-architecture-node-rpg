import { Input } from '../../../domain/shared-kernel/entity/input';
import { Move } from '../../../domain/world/entity/move';

export interface MoveCharacterInput extends Input {
  characterName: string;
  move: Move
}
