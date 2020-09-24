export class Character {
  health: number;
  level: number;
  alive: boolean;
  name: string;
  type: CharacterType;
}

export type CharacterType = 'melee' | 'ranged';


export const createCharacter = (name: string, type: CharacterType): Character => {
  const create = new Character();
  create.alive = true;
  create.health = 1000;
  create.level = 1;
  create.name = name;
  create.type = type;
  return create;
};
