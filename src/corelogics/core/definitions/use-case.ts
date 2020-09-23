import { Input } from '../entity/input';
import { Output } from '../entity/output';

export interface UseCase {

  execute(input: Input): Promise<Output>
}
