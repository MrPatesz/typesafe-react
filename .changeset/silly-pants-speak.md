---
"typesafe-react": major
---

For accepts "children" callback and does not support nullish "each" anymore.
Instead of nullability it only checks for emptiness.

- old syntax: \<For each={[]} keyFn={(i) => i.id} mapFn={(i) => i.value} />
- new syntax: \<For each={[]} keyFn={(i) => i.id}>{(i) => i.value}\</For>
