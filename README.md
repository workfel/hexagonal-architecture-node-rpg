# Hexagonal Architecture RPG Combat Kata


## Introduction
This is my first project using hexagonal architecture using NodeJS with Typescript. I implement this [RPG Combat Kata](https://github.com/ardalis/kata-catalog/blob/master/katas/RPG%20Combat.md).


## TODO

- [ ] Do the "Iteration One"
- [ ] Do the "Iteration Two"
- [ ] Do the "Iteration Three"

## Structure
src
├── corelogics
│     ├── adapters
│     │     └── secondaries
│     │         └── in-memory-character-repository.ts
│     ├── core
│     │     ├── definitions
│     │     │     └── use-case.ts
│     │     └── entity
│     │         ├── input.ts
│     │         └── output.ts
│     └── domains
│         └── characters
│             ├── entity
│             │     └── character.ts
│             └── usecase
│                 ├── addCharacter
│                 │     ├── addCharacter.input.ts
│                 │     ├── addCharacter.output.ts
│                 │     ├── addCharacter.spec.ts
│                 │     └── addCharacter.ts
│                 ├── character-repository.ts
│                 ├── healCharacter
│                 │     ├── healCharacter.input.ts
│                 │     ├── healCharacter.output.ts
│                 │     ├── healCharacter.spec.ts
│                 │     └── healCharacter.ts
│                 └── receiveDamage
│                     ├── receiveDamage.input.ts
│                     ├── receiveDamage.output.ts
│                     ├── receiveDamage.spec.ts
│                     └── receiveDamage.ts
└── index.ts
