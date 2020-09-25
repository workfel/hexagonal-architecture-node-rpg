import { Output } from '../../../domain/shared-kernel/entity/output';
import { World } from '../../../domain/world/entity/world';

export interface CreateWorldOutput extends Output {
  world: World;
}
