Je bent hier vast terecht gekomen omdat ECMAscript 6 vol met obscure constructies
zit. Hier een paar uitgelegd.

# Functies aanmaken
```javascript
function a1() {
    return 5;
}

const a2 = () => 5;

function b1(x) {
    x = x * x;
    return x + 5;
}

const b2 = x => {
    x = x * x;
    return x + 5;
};
```
a1 en a2 doen exact hetzelfde, net als b1 en b2, maar de const notatie is korter
en doet iets andere dingen met scope.


# Spread operator
```javascript
a = {a: '1', b: '2', c: '3'};
b1 = { ...a, c: '4' };
b2 = {a: '1', b: '2', c: '4'};
```
b1 en b2 hebben nu dezelfde waardes.
De spread(...) operator is een makkelijke manier om objecten te kopieëren naar
een nieuw object.

# Importeren en exporteren
`library.js`
```javascript
export function add(x, y) {
    return x + y;
}

export function multiply(x, y) {
    return x * y;
}

export default function library() {
    return 'library';
}
```

`program.js`
```javascript
// Importeer een library uit je dependencies
import React from 'react';
// Importeer uit je lokale bestanden
import library from './library';
// Importeer niet-default exports, niet alles hoeft geïmporteerd te worden.
import { add, multiply } from './library'
```
