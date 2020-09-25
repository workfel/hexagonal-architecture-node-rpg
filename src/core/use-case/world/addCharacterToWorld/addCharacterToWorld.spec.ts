import { WorldRepository } from '../../../domain/world/world.repository';
import { AddCharacterToWorld } from './addCharacterToWorld';
import { CharacterRepository } from '../../../domain/character/character-repository';
import { AddCharacterToWorldInput } from './addCharacterToWorld.input';
import { InMemoryWorldRepository } from '../../../adapters/secondaries/in-memory-world-repository';
import { InMemoryCharacterRepository } from '../../../adapters/secondaries/in-memory-character-repository';

describe('Add character to world', () => {
  let repository: WorldRepository;
  let characterRepository: CharacterRepository;

  beforeEach(() => {
    repository = new InMemoryWorldRepository();
    characterRepository = new InMemoryCharacterRepository();
  });

  test('should add new character to world ', async () => {
    const useCase = new AddCharacterToWorld(repository, characterRepository);
    const input: AddCharacterToWorldInput = {
      characterName: 'Hulk',
      position: {
        x: 0,
        y: 0
      }
    };
    const { success, position } = await useCase.execute(input);
    expect(success).toBe(true);
    expect(position).toEqual({ x: 0, y: 0 });
  });
});
