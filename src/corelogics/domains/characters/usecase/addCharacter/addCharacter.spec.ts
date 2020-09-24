import { AddCharacter } from './addCharacter';
import { AddCharacterInput } from './addCharacter.input';
import { CharacterRepository } from '../character-repository';
import { InMemoryCharacterRepository } from '../../../../../adapters/secondaries/in-memory-character-repository';

describe('Add Character', () => {

  let repository: CharacterRepository;

  beforeEach(() => {
    repository = new InMemoryCharacterRepository();
  });

  test('should create character with init value', async () => {
    const addCharacter = new AddCharacter(repository);
    const input: AddCharacterInput = {
      name: 'Hulk',
      type: 'melee'
    };

    const { character } = await addCharacter.execute(input);
    expect(character.health).toEqual(1000);
    expect(character.level).toEqual(1);
    expect(character.alive).toBe(true);
    expect(character.name).toBe(input.name);
  });


  test('shouldn\'t create character with name already chosen', async () => {
    const addCharacter = new AddCharacter(repository);
    const input: AddCharacterInput = {
      name: 'Hulk',
      type: 'melee'
    };

    const { character: character1 } = await addCharacter.execute(input);
    const { success } = await addCharacter.execute(input);

    expect(success).toBe(false);

  });
});
