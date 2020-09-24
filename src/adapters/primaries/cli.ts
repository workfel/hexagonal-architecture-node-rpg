import program from 'commander';

import { InMemoryCharacterRepository } from '../secondaries/in-memory-character-repository';
import { AddCharacter } from '../../corelogics/domains/characters/usecase/addCharacter/addCharacter';
import { HealCharacter } from '../../corelogics/domains/characters/usecase/healCharacter/healCharacter';

program
  .option('-c --character <name>', 'character name')
  .option('-t, --type', 'Character type 1 : melee , 2 ranged')
  .option('-h, --heal', 'Heal');

program.parse(process.argv);


(async () => {
  const characterRepository = new InMemoryCharacterRepository();
  const addCharacter = new AddCharacter(characterRepository);
  const healCharacter = new HealCharacter(characterRepository);
  if (!program.character) {
    throw new Error('-c is required');
  }

  if (!program.type) {
    throw new Error('-t is required');
  }

  const { character } = await addCharacter.execute({
    name: program.character,
    type: program.type === 1 ? 'melee' : 'ranged'
  });
  console.log({ character });

  if (program.heal) {
    const { character } = await healCharacter.execute({
      name: program.character,
      pv: 10
    });
    console.log('Healed', { character });
  }


})();
