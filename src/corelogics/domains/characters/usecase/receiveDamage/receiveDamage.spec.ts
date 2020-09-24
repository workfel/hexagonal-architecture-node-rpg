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
    const { useCase, receiver, attacker } = setupUseCaseAndCreateCharacter(repository);
    const input: ReceiveDamageInput = {
      receiver: receiver,
      damage: 50,
      attacker
    };
    const { character } = await useCase.execute(input);
    expect(character.health).toBe(950);
  });
  test('should character died if health becomes 0 ', async () => {
    const { useCase, receiver, attacker } = setupUseCaseAndCreateCharacter(repository);
    const input: ReceiveDamageInput = {
      receiver: receiver,
      damage: 600,
      attacker
    };
    await useCase.execute(input);
    const input2: ReceiveDamageInput = {
      receiver: receiver,
      damage: 400,
      attacker
    };
    const { character } = await useCase.execute(input2);
    expect(character.alive).toBe(false);
    expect(character.health).toBe(0);
  });
  test('should character health is 0 with more than 1000 damage', async () => {
    const { useCase, receiver, attacker } = setupUseCaseAndCreateCharacter(repository);
    const input: ReceiveDamageInput = {
      receiver: receiver,
      damage: 1300,
      attacker
    };
    const { character } = await useCase.execute(input);
    expect(character.alive).toBe(false);
    expect(character.health).toBe(0);
  });


  test('should damage to itself', async () => {
    const { useCase, receiver } = setupUseCaseAndCreateCharacter(repository);
    const input: ReceiveDamageInput = {
      receiver: receiver,
      damage: 1300,
      attacker: receiver
    };
    const { success, character } = await useCase.execute(input);
    expect(success).toBe(false);
    expect(character.alive).toBe(true);
    expect(character.health).toBe(1000);
  });

  function setupUseCaseAndCreateCharacter(repository: CharacterRepository) {
    const useCase = new ReceiveDamage(repository);
    const newCharacter = createCharacter('Hulk');
    const attacker = createCharacter('Thor');
    repository.create(newCharacter);
    repository.create(attacker);
    return { useCase, receiver: newCharacter, attacker };
  }
});
