# Hexagonal Architecture RPG Combat Kata


## Introduction
This is my first project using hexagonal architecture using NodeJS with Typescript. I implement this [RPG Combat Kata](https://github.com/ardalis/kata-catalog/blob/master/katas/RPG%20Combat.md).


## TODO

- [x] Do the "Iteration One"
- [x] Do the "Iteration Two"
- [ ] Do the "Iteration Three"

## Structure

```
src
├── core
│     ├── adapters
│     │     ├── primaries
│     │     │     └── cli.ts
│     │     └── secondaries
│     │           └── in-memory-character-repository.ts
│     ├── domain
│     │     ├── character
│     │     │     ├── character-repository.ts
│     │     │     └── entity
│     │     │         ├── character-heal-calculator.ts
│     │     │         └── character.ts
│     │     ├── shared-kernel
│     │     │     ├── definitions
│     │     │     │     ├── use-case.ts
│     │     │     │     ├── validator-result.ts
│     │     │     │     └── validator.ts
│     │     │     └── entity
│     │     │         ├── input.ts
│     │     │         └── output.ts
│     └── use-case
│         ├── character
│         │     ├── addCharacter
│         │     │     ├── addCharacter.input.ts
│         │     │     ├── addCharacter.output.ts
│         │     │     ├── addCharacter.spec.ts
│         │     │     └── addCharacter.ts
│         │     ├── healCharacter
│         │     │     ├── healCharacter.input.ts
│         │     │     ├── healCharacter.output.ts
│         │     │     ├── healCharacter.spec.ts
│         │     │     └── healCharacter.ts
│         │     └── receiveDamage
│         │         ├── receiveDamage.input.ts
│         │         ├── receiveDamage.output.ts
│         │         ├── receiveDamage.spec.ts
│         │         └── receiveDamage.ts
```
