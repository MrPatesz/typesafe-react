---
"typesafe-react": major
---

Behaves similarly to switch now, it receives a callback for each case and only runs the correct code block.

- old syntax: when(AorB, { A: 'a', B: 'b' })
- new syntax: when(AorB, { A: () => 'a', B: () => 'b' })

It will only accept "children" as a callback that receives either "when" or "whenAll".

- old syntax: \<Show when={objOrNull} childrenFn={(obj) => '...'} />
- new syntax: \<Show when={objOrNull}>{(obj) => '...'}\</Show>
