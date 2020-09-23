import { ReceiveDamage } from './receiveDamage';
import { CharacterRepository } from '../character-repository';
import { InMemoryCharacterRepository } from '../../../../adapters/secondaries/in-memory-character-repository';
import { ReceiveDamageInput } from './receiveDamage.input';
import { Character, createCharacter } from '../../entity/character';


describe('Receive Damage', () => {
  let repository: CharacterRepository;

  beforeEach(() => {
    repository = new InMemoryCharacterRepository();
  });

  test('should subtract health', async () => {
    const { useCase, newCharacter } = setupUseCaseAndCreateCharacter(repository);
    const input: ReceiveDamageInput = {
      character: newCharacter,
      damage: 50
    };
    const { character } = await useCase.execute(input);
    expect(character.health).toBe(950);
  });
  test('should character died if health becomes 0 ', async () => {
    const { useCase, newCharacter } = setupUseCaseAndCreateCharacter(repository);
    const input: ReceiveDamageInput = {
      character: newCharacter,
      damage: 600
    };
    await useCase.execute(input);
    const input2: ReceiveDamageInput = {
      character: newCharacter,
      damage: 400
    };
    const { character } = await useCase.execute(input2);
    expect(character.alive).toBe(false);
    expect(character.health).toBe(0);
  });
  test('should character health is 0 with more than 1000 damage', async () => {
    const { useCase, newCharacter } = setupUseCaseAndCreateCharacter(repository);
    const input: ReceiveDamageInput = {
      character: newCharacter,
      damage: 1300
    };
    const { character } = await useCase.execute(input);
    expect(character.alive).toBe(false);
    expect(character.health).toBe(0);
  });

  function setupUseCaseAndCreateCharacter(repository: CharacterRepository) {
    const useCase = new ReceiveDamage(repository);
    const newCharacter = createCharacter('Hulk');
    repository.create(newCharacter);
    return { useCase, newCharacter };
  }
});
