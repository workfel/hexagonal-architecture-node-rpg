import { WorldRepository } from '../../../domain/world/world.repository';
import { CharacterRepository } from '../../../domain/character/character-repository';
import { MoveCharacter } from './moveCharacter';
import { MoveCharacterInput } from './moveCharacter.input';
import { Move } from '../../../domain/world/entity/move';
import { World } from '../../../domain/world/entity/world';
import { AddCharacter } from '../../character/addCharacter/addCharacter';
import { InMemoryWorldRepository } from '../../../adapters/secondaries/in-memory-world-repository';
import { InMemoryCharacterRepository } from '../../../adapters/secondaries/in-memory-character-repository';

describe('Move character into world', () => {
  let worldRepository: WorldRepository;
  let characterRepository: CharacterRepository;

  beforeEach(async () => {
    worldRepository = new InMemoryWorldRepository();
    characterRepository = new InMemoryCharacterRepository();
    worldRepository.create(new World(10));
    let addCharacter = new AddCharacter(characterRepository);
    const { character } = await addCharacter.execute({
      type: 'ranged',
      name: 'Hulk'
    });
    worldRepository.placeCharacter(character, { y: 0, x: 0 });
  });

  test('should move character to left ', async () => {
    const useCase = new MoveCharacter(worldRepository, characterRepository);
    const input: MoveCharacterInput = {
      move: Move.left,
      characterName: 'Hulk'
    };
    const { success, character } = await useCase.execute(input);
    expect(success).toBe(true);
    expect(character.position).toEqual({ x: 1, y: 0 });
  });
  test('should move character to down ', async () => {
    const useCase = new MoveCharacter(worldRepository, characterRepository);
    const input: MoveCharacterInput = {
      move: Move.down,
      characterName: 'Hulk'
    };
    const { success, character } = await useCase.execute(input);
    expect(success).toBe(true);
    expect(character.position).toEqual({ x: 0, y: 1 });
  });
});
