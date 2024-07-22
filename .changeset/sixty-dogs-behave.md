---
"typesafe-react": major
---

when's fallback is also a callback.

- old syntax: when(abc, { a: () => 'a' }, 'abc')
- new syntax: when(abc, { a: () => 'a' }, () => 'abc')
