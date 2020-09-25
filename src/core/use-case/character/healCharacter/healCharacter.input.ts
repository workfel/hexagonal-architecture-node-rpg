import { Input } from '../../../domain/shared-kernel/entity/input';

export class HealCharacterInput implements Input {
  name: string;
  pv: number;
}
