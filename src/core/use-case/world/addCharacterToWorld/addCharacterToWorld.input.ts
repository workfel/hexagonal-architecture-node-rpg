import { Input } from '../../../domain/shared-kernel/entity/input';
import { Position } from '../../../domain/world/entity/position';

export interface AddCharacterToWorldInput extends Input {
  characterName: string;
  position: Position;
}
