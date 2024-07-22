# typesafe-react

## 4.0.1

### Patch Changes

- 00cf4a2: Updated README for when.

## 4.0.0

### Major Changes

- 9c95047: when's fallback is also a callback.

  - old syntax: when(abc, { a: () => 'a' }, 'abc')
  - new syntax: when(abc, { a: () => 'a' }, () => 'abc')

## 3.1.0

### Minor Changes

- 825119f: Show accepts ReactNode as "children" again, which is useful if "when" is a boolean.

## 3.0.0

### Major Changes

- 5220e77: Behaves similarly to switch now, it receives a callback for each case and only runs the correct code block.

  - old syntax: when(AorB, { A: 'a', B: 'b' })
  - new syntax: when(AorB, { A: () => 'a', B: () => 'b' })

  It will only accept "children" as a callback that receives either "when" or "whenAll".

  - old syntax: \<Show when={objOrNull} childrenFn={(obj) => '...'} />
  - new syntax: \<Show when={objOrNull}>{(obj) => '...'}\</Show>

## 2.1.0

### Minor Changes

- 8bf0057: Improvement: Show can receive multiple conditions.

## 2.0.1

### Patch Changes

- 35951bf: Fix: fixed JSDoc of For component.

## 2.0.0

### Major Changes

- 21dcdce: Improvement: For is more ergonomic.

  - getKey renamed to keyFn
  - keyFn is not nullable anymore
  - keyFn now receives index

## 1.0.1

### Patch Changes

- 03bdf34: Improvement: better type inference for when function.

## 1.0.0

### Major Changes

- 699dd73: Improvement: when is more ergonomic.

  - old syntax: when({expression, cases, fallback})
  - new syntax: when(expression, cases, fallback)

## 0.5.2

### Patch Changes

- 856d03d: Bugfix: when now correctly expects fallback if 'E' is string | number

## 0.5.1

### Patch Changes

- 311a852: added For to README

## 0.5.0

### Minor Changes

- 35f74fc: Feature: For component for rendering lists.

## 0.4.3

### Patch Changes

- 71b9f68: added README and repository

## 0.4.2

### Patch Changes

- 921e548: Feature: added JSDoc to the functions and hooks.

## 0.4.1

### Patch Changes

- 36fe379: Feature: better type inference for when function.

## 0.4.0

### Minor Changes

- fbe2b46: Feature: Show can either receive children or childrenFn. ChildrenFn provides a way to use 'when' property's NonNullable value for rendering content.

## 0.3.1

### Patch Changes

- f4d6f10: Bugfix: when's cases returning null or undefined will not cause the function to return fallback.

## 0.3.0

### Minor Changes

- eac8114: Show: Component for conditional rendering.

## 0.2.2

### Patch Changes

- f0d3c6f: Folder restructure bugfix

## 0.2.1

### Patch Changes

- 1be16b4: Folder restructure bugfix

## 0.2.1

### Patch Changes

- cd9a39b: Folder restructure bugfix

## 0.2.0

### Minor Changes

- 45f01ba: When: Kotlin-like exhaustive switch component.

## 0.1.0

### Minor Changes

- 27c77e2: when: Kotlin-like exhaustive switch function.
