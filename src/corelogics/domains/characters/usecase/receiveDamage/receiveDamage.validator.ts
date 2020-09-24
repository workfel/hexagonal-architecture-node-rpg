import { Validator } from '../../../../core/definitions/validator';
import { ReceiveDamageInput } from './receiveDamage.input';
import { ValidatorResult } from '../../../../core/definitions/validator-result';

export class ReceiveDamageValidator implements Validator<ReceiveDamageInput>{
  validate(value: ReceiveDamageInput): ValidatorResult {
    return undefined;
  }

}
