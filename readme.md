# 🧪 Introduction aux tests avec Vitest et au TDD

Ce document est un guide d'introduction pour comprendre a quoi servent les tests, comment ecrire des tests unitaires avec Vitest, et pourquoi le TDD peut ameliorer votre facon de developper.

L'objectif n'est pas seulement d'apprendre une syntaxe, mais de comprendre la logique derriere les tests :

- un test verifie un comportement attendu
- un bon test protege le code contre les regressions
- le TDD aide a construire le code a partir des besoins plutot qu'a partir d'intuitions

> En bref
>
> Ce guide explique pourquoi on teste, comment ecrire un test simple avec Vitest, et comment utiliser le TDD pour avancer pas a pas.

---

# 🎯 Objectifs pedagogiques

A la fin de ce guide, vous devez etre capable de :

- expliquer pourquoi on ecrit des tests
- distinguer les principaux types de tests
- ecrire et lire un test unitaire avec Vitest
- comprendre le cycle `Red -> Green -> Refactor`
- identifier les comportements importants a tester
- eviter les erreurs classiques quand on debute

---

# 📚 Sommaire

| Partie                                        | Ce que vous allez y trouver                                     |
| --------------------------------------------- | --------------------------------------------------------------- |
| 1. Pourquoi tester                            | le role des tests et la notion de regression                    |
| 2. Ce qu'un test verifie vraiment             | la logique `Entree -> Action -> Resultat attendu`               |
| 3. Les differents types de tests              | les differences entre unitaire, integration, fonctionnel et E2E |
| 4. Pourquoi commencer par les tests unitaires | pourquoi c'est le meilleur point d'entree                       |
| 5. Installer et lancer Vitest                 | installation, scripts et usage courant                          |
| 6. Anatomie d'un test                         | la structure `describe / it / expect`                           |
| 7. Premier test unitaire                      | un exemple minimal complet                                      |
| 8. Bien choisir ses cas de test               | comment identifier les bons scenarios                           |
| 9. Introduction au TDD                        | la logique generale du developpement guide par les tests        |
| 10. Cycle `Red -> Green -> Refactor`          | la boucle centrale du TDD                                       |
| 11. Exemple TDD pas a pas                     | une progression concrete sur une petite fonction                |
| 12. Exemple proche d'un projet web            | un cas de validation realiste                                   |
| 13. Erreurs frequentes                        | les pieges classiques quand on debute                           |
| 14. Cheat sheet Vitest                        | les syntaxes et assertions utiles                               |
| 15. Exercices                                 | des entrainements progressifs                                   |
| 16. Conclusion                                | les idees essentielles a retenir                                |

---

# 1️⃣ Pourquoi tester

Quand on developpe une application, on modifie le code en permanence :

- ajout d'une fonctionnalite
- correction d'un bug
- refactorisation
- changement d'une regle metier

Le probleme, c'est qu'une modification locale peut casser un comportement qui fonctionnait avant. C'est ce qu'on appelle une regression.

Les tests servent a verifier automatiquement que le logiciel se comporte toujours comme prevu.

Ils apportent plusieurs benefices :

- ils reduisent le risque de casser l'existant
- ils documentent les comportements attendus
- ils donnent plus de confiance pendant les modifications
- ils aident a reperer plus vite les bugs

Un projet sans tests oblige souvent a verifier manuellement apres chaque changement. Cela prend du temps, fatigue, et laisse facilement passer des erreurs.

> A retenir
>
> Tester, ce n'est pas "faire propre". C'est proteger des comportements importants contre les regressions.

---

# 2️⃣ Ce qu'un test verifie vraiment

Un test ne verifie pas qu'un code "a l'air bon". Il verifie un comportement observable.

Un test repond generalement a trois questions :

| Entree   | Action   | Resultat attendu |
| -------- | -------- | ---------------- |
| `2 et 3` | addition | `5`              |

Cela signifie qu'un test doit etre lu comme une phrase de verification :

> si je fournis telle entree, alors je m'attends a tel resultat

Cette idee est tres importante : on teste le comportement, pas la sensation, ni l'intention du developpeur.

> Bon reflexe
>
> Quand vous ecrivez un test, demandez-vous toujours : "qu'est-ce que je veux observer concretement ?"

---

# 3️⃣ Les differents types de tests

## Tests unitaires

Les tests unitaires verifient une petite unite de code, souvent une fonction, de maniere isolee.

Exemples :

- verifier qu'une fonction additionne correctement
- verifier qu'une fonction de validation refuse une chaine vide
- verifier qu'une fonction retourne `true` ou `false` selon une regle metier

Caracteristiques :

- tres rapides
- precis
- faciles a comprendre
- faciles a executer souvent

## Tests d'integration

Les tests d'integration verifient que plusieurs morceaux du systeme collaborent correctement.

Exemples :

- une route Express qui appelle un service
- un composant React qui utilise une validation
- un module Socket.IO qui met a jour un etat

On ne teste plus seulement une fonction isolee, mais la relation entre plusieurs couches.

## Tests fonctionnels

Les tests fonctionnels verifient une regle ou un besoin metier.

Exemples :

- un utilisateur peut se connecter
- un message invalide est refuse
- un joueur rejoint correctement une room

Ici, la question n'est pas "quelle fonction est appelee ?", mais "est-ce que le besoin utilisateur est respecte ?"

## Tests End-to-End

Les tests E2E verifient un parcours complet, du point de vue de l'utilisateur.

Exemple de chaine verifiee :

    utilisateur -> interface -> API -> base de donnees

Ces tests sont utiles, mais plus lents, plus fragiles et plus couteux a maintenir que les tests unitaires.

## Vue d'ensemble

| Type de test | Ce qu'il verifie                         | Quand l'utiliser                                                      |
| ------------ | ---------------------------------------- | --------------------------------------------------------------------- |
| Unitaire     | une fonction ou une unite isolee         | pour valider une regle precise rapidement                             |
| Integration  | la collaboration entre plusieurs modules | pour verifier qu'une route, un service ou un composant cooperent bien |
| Fonctionnel  | un besoin metier                         | pour confirmer qu'une regle utilisateur est respectee                 |
| E2E          | un parcours complet                      | pour tester l'experience reelle de bout en bout                       |

---

# 4️⃣ Pourquoi commencer par les tests unitaires

Quand on debute, les tests unitaires sont le meilleur point d'entree.

Pourquoi :

- ils demandent peu de mise en place
- ils permettent de comprendre la logique d'un test sans complexite technique inutile
- ils donnent un feedback tres rapide
- ils entrainent a raisonner en comportements

En pratique, ils apprennent la discipline essentielle :

> prendre une regle, la traduire en cas de test, puis verifier que le code respecte cette regle

---

# 5️⃣ Installer et lancer Vitest

Vitest est un framework de test tres utilise dans l'ecosysteme JavaScript et TypeScript. Il permet d'ecrire, d'executer et de surveiller les tests facilement.

## Installation

```bash
pnpm add -D vitest
```

Si votre projet utilise `npm` :

```bash
npm install -D vitest
```

Si votre projet utilise `yarn` :

```bash
yarn add -D vitest
```

## Scripts recommandes

Dans `package.json` :

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:watch": "vitest watch",
    "test:coverage": "vitest run --coverage"
  }
}
```

## A quoi servent ces scripts

| Script               | Utilite                                             |
| -------------------- | --------------------------------------------------- |
| `pnpm test`          | lance Vitest en mode interactif                     |
| `pnpm test:run`      | execute les tests une seule fois                    |
| `pnpm test:watch`    | relance les tests quand un fichier change           |
| `pnpm test:coverage` | mesure les portions de code executees par les tests |

Quand on travaille en TDD, le mode watch est souvent le plus confortable, car il donne un retour immediat apres chaque modification.

---

# 6️⃣ Anatomie d'un test

Voici une structure classique :

```js
describe("feature", () => {
  it("scenario", () => {
    expect(result).toBe(expected);
  });
});
```

## Signification des mots-cles

| Mot-cle    | Role                                    |
| ---------- | --------------------------------------- |
| `describe` | regroupe des tests lies a un meme sujet |
| `it`       | decrit un scenario de test              |
| `test`     | equivalent a `it`                       |
| `expect`   | exprime ce qu'on attend                 |
| `toBe`     | compare une valeur simple               |

## Comment lire ce code

On peut lire ce test comme une phrase :

> decrire une fonctionnalite, puis verifier qu'un scenario produit le resultat attendu

## Une autre facon utile de structurer un test

On utilise souvent la logique suivante :

| Etape     | Role                 |
| --------- | -------------------- |
| `Arrange` | preparer les donnees |
| `Act`     | executer l'action    |
| `Assert`  | verifier le resultat |

Exemple :

```js
it("additionne deux nombres", () => {
  const a = 2;
  const b = 3;

  const result = add(a, b);

  expect(result).toBe(5);
});
```

Cette structure rend les tests plus faciles a lire et a maintenir.

> A retenir
>
> Un test clair est souvent un test qu'on peut lire presque comme une petite histoire.

---

# 7️⃣ Premier test unitaire

Prenons une fonction simple :

```js
export function add(a, b) {
  return a + b;
}
```

Son test :

```js
import { describe, expect, it } from "vitest";
import { add } from "./add";

describe("add", () => {
  it("additionne deux nombres", () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

## Ce que ce test dit

Il dit simplement :

> si j'appelle `add(2, 3)`, alors je dois obtenir `5`

Un bon test est souvent tres simple a lire. Si un test est confus, il documente mal le comportement et perd de sa valeur.

---

# 8️⃣ Bien choisir ses cas de test

L'une des competences les plus importantes n'est pas d'ecrire `expect(...)`, mais de choisir les bons cas.

Une methode simple consiste a penser a trois categories :

- cas normal
- cas limite
- cas invalide ou erreur

## Exemple avec `isAdult(age)`

Regle metier :

- si `age < 18`, le resultat est `false`
- si `age >= 18`, le resultat est `true`

Cas a tester :

| Valeur testee | Resultat attendu | Pourquoi                                   |
| ------------- | ---------------- | ------------------------------------------ |
| `15`          | `false`          | cas normal inferieur a 18                  |
| `18`          | `true`           | cas limite, c'est la frontiere de la regle |
| `25`          | `true`           | cas normal superieur a 18                  |

Selon le contexte, on peut aussi se demander :

- que faire avec `0` ?
- que faire avec une valeur negative ?
- que faire avec `null` ou une chaine ?

Tous les cas ne sont pas toujours necessaires, mais il faut au minimum couvrir les comportements importants et les bords de regle.

---

# 9️⃣ Introduction au TDD

TDD signifie :

    Test Driven Development

En francais, on parle souvent de developpement guide par les tests.

## Approche classique

Souvent, on travaille dans cet ordre :

    coder -> tester -> corriger

## Approche TDD

Avec le TDD, on inverse la logique :

    tester -> coder -> ameliorer

L'idee n'est pas d'ecrire "beaucoup de tests" avant de coder. L'idee est d'avancer petit pas par petit pas en faisant emerger le code a partir des comportements attendus.

Le TDD force a clarifier la question :

> qu'est-ce que mon code doit faire exactement ?

> Idee cle
>
> En TDD, le test n'arrive pas a la fin du travail. Il sert a guider le travail.

---

# 🔁 10. Cycle `Red -> Green -> Refactor`

Le TDD repose sur un cycle simple :

    RED -> GREEN -> REFACTOR

| Phase      | Ce qu'on fait                                  | Pourquoi                                         |
| ---------- | ---------------------------------------------- | ------------------------------------------------ |
| `RED`      | ecrire un test qui echoue                      | prouver que le besoin n'est pas encore satisfait |
| `GREEN`    | ecrire le minimum de code pour le faire passer | avancer sans surdevelopper                       |
| `REFACTOR` | ameliorer le code sans changer le comportement | garder un code propre et evolutif                |

## RED

On ecrit un test qui echoue.

Pourquoi c'est utile :

- cela prouve que le comportement n'existe pas encore
- cela confirme que le test est capable de detecter le probleme

## GREEN

On ecrit le minimum de code pour faire passer le test.

Le mot important ici est minimum.

Le but n'est pas de produire tout de suite une solution parfaite. Le but est de satisfaire le besoin actuellement exprime par le test.

## REFACTOR

Une fois le test au vert, on peut ameliorer le code :

- clarifier les noms
- simplifier la logique
- supprimer les duplications
- reorganiser proprement la fonction

Pendant cette phase, les tests servent de filet de securite.

---

# 11️⃣ Exemple TDD pas a pas

Objectif : creer la fonction `isAdult(age)`.

## Regle metier

- `age < 18 -> false`
- `age >= 18 -> true`

## Etape 1 : ecrire un premier test

```js
import { describe, expect, it } from "vitest";
import { isAdult } from "./isAdult";

describe("isAdult", () => {
  it("retourne false si l'age est inferieur a 18", () => {
    expect(isAdult(15)).toBe(false);
  });
});
```

Resultat :

    test failed

Nous sommes en phase `RED`.

## Etape 2 : ecrire le code minimal

```js
export function isAdult(age) {
  return false;
}
```

Resultat :

    tests passed

Nous sommes en phase `GREEN`.

Le code n'est pas "intelligent". Il repond juste au premier besoin exprime.

## Etape 3 : ajouter un nouveau comportement

```js
it("retourne true si l'age est superieur ou egal a 18", () => {
  expect(isAdult(18)).toBe(true);
});
```

Resultat :

    test failed

Retour en `RED`.

## Etape 4 : generaliser la logique

```js
export function isAdult(age) {
  return age >= 18;
}
```

Resultat :

    tests passed

Retour en `GREEN`.

## Ce qu'il faut retenir

Le TDD ne consiste pas a deviner la solution finale d'un coup. Il consiste a laisser les tests pousser le code dans la bonne direction.

Chaque nouveau test ajoute une contrainte supplementaire.

---

# 12️⃣ Exemple proche d'un projet web

Prenons une regle simple de validation de message de chat.

## Fonction

```js
export function validateMessage(message) {
  if (!message) return false;
  if (message.trim().length === 0) return false;
  return true;
}
```

## Tests

```js
import { describe, expect, it } from "vitest";
import { validateMessage } from "./validateMessage";

describe("validateMessage", () => {
  it("refuse un message vide", () => {
    expect(validateMessage("")).toBe(false);
  });

  it("refuse un message compose uniquement d'espaces", () => {
    expect(validateMessage("   ")).toBe(false);
  });

  it("accepte un message non vide", () => {
    expect(validateMessage("bonjour")).toBe(true);
  });
});
```

## Pourquoi cet exemple est interessant

Il montre une situation tres proche d'un vrai projet :

- on formalise une petite regle metier
- on identifie plusieurs cas concrets
- on verifie a la fois le cas nominal et les cas invalides

Ce type de test est tres utile dans une application web, car beaucoup de bugs viennent de validations mal definies ou partiellement testees.

---

# ⚠️ 13. Erreurs frequentes

## Tester seulement le happy path

Beaucoup de debutants testent uniquement le cas qui fonctionne "normalement".

Exemple :

- `"bonjour" -> true`

Mais si vous ne testez pas les cas vides, limites ou invalides, vous laissez les zones les plus fragiles sans protection.

## Ecrire des tests trop vagues

Un intitule comme :

    it("should work")

apporte tres peu d'information.

Preferez une formulation precise :

    it("refuse un message compose uniquement d'espaces")

## Tester l'implementation plutot que le comportement

Un test doit verifier ce que le code fait, pas comment vous imaginez qu'il le fait.

Si vous changez l'interieur d'une fonction sans changer son comportement, le test devrait idealement continuer a passer.

## Faire des tests trop gros

Un test qui verifie trop de choses a la fois devient difficile a comprendre et a deboguer.

En general :

- un test = un scenario principal

---

# 🧾 14. Cheat sheet Vitest

## Structure de base

```js
describe("feature", () => {
  it("scenario", () => {
    expect(value).toBe(expected);
  });
});
```

## Assertions courantes

| Assertion                                          | Usage                               |
| -------------------------------------------------- | ----------------------------------- |
| `expect(2 + 3).toBe(5)`                            | comparer une valeur simple          |
| `expect({ name: "Tom" }).toEqual({ name: "Tom" })` | comparer le contenu d'un objet      |
| `expect([1, 2, 3]).toContain(2)`                   | verifier qu'une valeur est presente |
| `expect([1, 2, 3]).toHaveLength(3)`                | verifier une longueur               |
| `expect("test@mail.com").toMatch(/@/)`             | verifier un motif                   |
| `expect(() => divide(4, 0)).toThrow()`             | verifier qu'une erreur est levee    |
| `expect(5).not.toBe(10)`                           | exprimer l'inverse d'une attente    |

## Difference utile entre `toBe` et `toEqual`

- `toBe` compare des valeurs simples ou la meme reference
- `toEqual` compare le contenu de tableaux ou d'objets

Exemple :

```js
expect(5).toBe(5);
expect({ id: 1 }).toEqual({ id: 1 });
```

---

# 🏋️ 15. Exercices

## Exercice 1 : multiplication

Creez la fonction :

```js
multiply(a, b);
```

A faire :

- ecrire au moins deux tests
- verifier un cas simple
- verifier un cas avec `0`

## Exercice 2 : nombre pair

Creez :

```js
isEven(number);
```

Regles :

- pair -> `true`
- impair -> `false`

A faire :

- tester un nombre pair
- tester un nombre impair
- tester `0`

## Exercice 3 : validation de nom d'utilisateur

Creez :

```js
validateUsername(username);
```

Regles :

- minimum 3 caracteres
- maximum 20 caracteres

A faire :

- tester un nom trop court
- tester un nom valide
- tester un nom trop long

## Exercice 4 : mini demarche TDD

Choisissez une fonction simple, par exemple :

```js
isPositive(number);
```

Travail attendu :

1. ecrire un premier test qui echoue
2. ecrire le code minimal
3. ajouter un deuxieme test
4. faire evoluer le code
5. relire la progression `RED -> GREEN -> REFACTOR`

---

# 🧠 16. Conclusion

Les tests ne servent pas seulement a "verifier que ca marche". Ils servent a exprimer clairement les comportements que le code doit garantir.

Retenez ces idees :

- un test verifie un comportement observable
- les tests unitaires sont le meilleur point de depart
- Vitest permet d'ecrire et d'executer ces tests simplement
- le TDD aide a construire le code pas a pas
- la vraie difficulte n'est pas la syntaxe, mais le choix des bons comportements a proteger

Si vous ne devez retenir qu'une phrase, retenez celle-ci :

> un bon test dit clairement ce que le programme doit faire, et vous alerte des que ce n'est plus vrai
