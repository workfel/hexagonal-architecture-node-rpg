import { ReceiveDamage } from './receiveDamage';
import { CharacterRepository } from '../../../domain/character/character-repository';
import { ReceiveDamageInput } from './receiveDamage.input';
import { createCharacter } from '../../../domain/character/entity/character';
import { InMemoryCharacterRepository } from '../../../adapters/secondaries/in-memory-character-repository';


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
    const { character, success } = await useCase.execute(input);
    expect(success).toBe(true);
    expect(character.pv).toBe(950);
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
    expect(character.pv).toBe(0);
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
    expect(character.pv).toBe(0);
  });


  test('should not damage to itself', async () => {
    const { useCase, receiver } = setupUseCaseAndCreateCharacter(repository);
    const input: ReceiveDamageInput = {
      receiver: receiver,
      damage: 1300,
      attacker: receiver
    };
    const { success, character } = await useCase.execute(input);
    expect(success).toBe(false);
    expect(character.alive).toBe(true);
    expect(character.pv).toBe(1000);
  });

  test('should reduced damage by 50%', async () => {
    const { useCase, receiver, attacker } = setupUseCaseAndCreateCharacter(repository);
    receiver.level = 6;
    const input: ReceiveDamageInput = {
      receiver: receiver,
      damage: 100,
      attacker
    };
    const { success, character } = await useCase.execute(input);
    expect(success).toBe(true);
    expect(character.alive).toBe(true);
    expect(character.pv).toBe(950);
  });
  test('should increase damage by 50%', async () => {
    const { useCase, receiver, attacker } = setupUseCaseAndCreateCharacter(repository);
    attacker.level = 6;
    const input: ReceiveDamageInput = {
      receiver: receiver,
      damage: 100,
      attacker
    };
    const { success, character } = await useCase.execute(input);
    expect(success).toBe(true);
    expect(character.alive).toBe(true);
    expect(character.pv).toBe(850);
  });

  function setupUseCaseAndCreateCharacter(repository: CharacterRepository) {
    const useCase = new ReceiveDamage(repository);
    const newCharacter = createCharacter('Hulk', 'ranged');
    const attacker = createCharacter('Thor', 'ranged');
    repository.create(newCharacter);
    repository.create(attacker);
    return { useCase, receiver: newCharacter, attacker };
  }
});
