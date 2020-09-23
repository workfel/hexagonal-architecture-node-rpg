export class Character {
  health: number;
  level: number;
  alive: boolean;
  name: string;
}


export const createCharacter = (name: string): Character => {
  const create = new Character();
  create.alive = true;
  create.health = 1000;
  create.level = 1;
  create.name = name;
  return create;
};
