import { Validator } from '../../../domain/shared-kernel/definitions/validator';
import { ReceiveDamageInput } from './receiveDamage.input';
import { ValidatorResult } from '../../../domain/shared-kernel/definitions/validator-result';

export class ReceiveDamageValidator implements Validator<ReceiveDamageInput>{
  validate(value: ReceiveDamageInput): ValidatorResult {
    return undefined;
  }

}
