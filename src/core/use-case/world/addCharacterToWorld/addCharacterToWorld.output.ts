import { Output } from '../../../domain/shared-kernel/entity/output';
import { Position } from '../../../domain/world/entity/position';

export interface AddCharacterToWorldOutput extends Output {
  position: Position;
}
