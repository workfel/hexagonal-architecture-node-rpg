import { CharacterRepository } from '../../../domain/character/character-repository';
import { HealCharacter } from './healCharacter';
import { HealCharacterInput } from './healCharacter.input';
import { createCharacter } from '../../../domain/character/entity/character';
import { InMemoryCharacterRepository } from '../../../adapters/secondaries/in-memory-character-repository';

describe('Heal Character', () => {

  let repository: CharacterRepository;

  beforeEach(() => {
    repository = new InMemoryCharacterRepository();
  });

  test('should not heal dead character', async () => {

    const characterName = 'Hulk';
    repository.create(createCharacter(characterName, 'ranged'));
    await repository.die(characterName);
    const useCase = new HealCharacter(repository);
    const input: HealCharacterInput = {
      pv: 50,
      name: characterName
    };
    const { character, success } = await useCase.execute(input);
    expect(success).toBe(false);
    expect(character.pv).toBe(0);
    expect(character.alive).toBe(false);
  });

  test('should heal to 50pv character ', async () => {

    const characterName = 'Hulk';
    repository.create({
      ...createCharacter(characterName, 'ranged'),
      pv: 500
    });
    const useCase = new HealCharacter(repository);
    const input: HealCharacterInput = {
      pv: 50,
      name: characterName
    };
    const { character, success } = await useCase.execute(input);
    expect(success).toBe(true);
    expect(character.pv).toBe(550);
  });
  test('should not exceed 1000pv after healing ', async () => {
    const characterName = 'Hulk';
    repository.create({
      ...createCharacter(characterName, 'melee'),
      pv: 990
    });
    const useCase = new HealCharacter(repository);
    const input: HealCharacterInput = {
      pv: 30,
      name: characterName
    };
    const { character, success } = await useCase.execute(input);
    expect(success).toBe(true);
    expect(character.pv).toBe(1000);
  });
});
