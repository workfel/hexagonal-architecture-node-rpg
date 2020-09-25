import { UseCase } from '../../../domain/shared-kernel/definitions/use-case';
import { WorldRepository } from '../../../domain/world/world.repository';
import { CreateWorldInput } from './createWorld.input';
import { CreateWorldOutput } from './createWorld.output';
import { World } from '../../../domain/world/entity/world';

export class CreateWorld implements UseCase {
  constructor(private readonly repository: WorldRepository) {

  }

  async execute(input: CreateWorldInput): Promise<CreateWorldOutput> {

    const newWorld = new World();
    newWorld.width = input.size;
    newWorld.height = input.size;
    await this.repository.create(newWorld);
    return {
      world: newWorld,
      success: true
    };
  }

}
