import { WorldRepository } from '../../../domain/world/world.repository';
import { CreateWorld } from './createWorld';
import { CreateWorldInput } from './createWorld.input';
import { InMemoryWorldRepository } from '../../../adapters/secondaries/in-memory-world-repository';


describe('Create World', () => {

  let repository: WorldRepository;

  beforeEach(() => {
    repository = new InMemoryWorldRepository();
  });

  test('should init world map', async () => {
    const useCase = new CreateWorld(repository);
    const input: CreateWorldInput = {
      size: 10
    };
    const { world } = await useCase.execute(input);
    expect(world.height).toBe(10);
    expect(world.width).toBe(10);
  });
});
