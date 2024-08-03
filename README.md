# Framework agnostic functions, hooks and components.

## Functions

### when

Exhaustive switch statement with return value.

```ts
// handle all cases
const result1 = when(AorB, { A: () => 'a', B: () => 'b' });

// provide a fallback
const result2 = when(ABC, { A: () => 'a', B: () => 'b' }, () => 'abc');

// run some code
when(AorB, { A: () => console.log('a'), B: () => console.log('b') });

// even simpler
console.log(when(AorB, { A: () => 'a', B: () => 'b' }));
```

| Parameter    | Type                  | Description                                                                                                 |
| ------------ | --------------------- | ----------------------------------------------------------------------------------------------------------- |
| `expression` | `E`                   | Expression to evaluate.                                                                                     |
| `cases`      | `Record<CE, () => R>` | Record that maps some or all possible values of `expression` to a branch.                                   |
| `fallback`   | `(() => F) \| never`  | Default branch. Mandatory (and only allowed) if `cases` does not cover all possible values of `expression`. |

| Generic Type | Extends            | Description                                               |
| ------------ | ------------------ | --------------------------------------------------------- |
| `E`          | `string \| number` | `expression`'s type. Union of strings or numbers.         |
| `CE`         | `E`                | Union of covered `cases`. Subunion of `E` or same as `E`. |
| `const R`    | `unknown`          | Union of return values.                                   |
| `const F`    | `unknown`          | Fallback value.                                           |

## Components

### When

Exhaustive switch component.

```jsx
// handle all cases
const result1 = <When expression={AorB} cases={{ A: () => 'a', B: () => 'b' }} />;

// provide a fallback
const result2 = (
  <When expression={ABC} cases={{ A: () => 'a', B: () => 'b' }} fallback={() => 'abc'} />
);
```

| Prop         | Type                          | Description                                                                                                                      |
| ------------ | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | `E`                           | Expression to evaluate.                                                                                                          |
| `cases`      | `Record<CE, () => ReactNode>` | Record that maps some or all possible values of `expression` to a branch that returns content.                                   |
| `fallback`   | `(() => ReactNode) \| never`  | Default branch that returns content. Mandatory (and only allowed) if `cases` does not cover all possible values of `expression`. |

| Generic Type | Extends            | Description                                               |
| ------------ | ------------------ | --------------------------------------------------------- |
| `E`          | `string \| number` | `expression`'s type. Union of strings or numbers.         |
| `CE`         | `E`                | Union of covered `cases`. Subunion of `E` or same as `E`. |

### Show

Component to conditionally render content.

```jsx
// simple check
const result1 = (
  <Show when={show} fallback={`I am visible if 'show' is falsy.`}>
    I am visible if 'show' is truthy.
  </Show>
);

// multiple conditions
const result1 = <Show when={[show, !hidden]}>I am visible if all conditions are truthy.</Show>;

// use when's value
const result2 = <Show when={nullableArray}>{(data) => data.length}</Show>;

// use whenAll's values
const result2 = (
  <Show when={[nullableArray, nullableObject]} fallback={'Something went wrong!'}>
    {([array, object]) => array.length + object.numberProperty}
  </Show>
);
```

| Prop       | Type                                                                                                                    | Description                                                                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `when`     | `W`                                                                                                                     | Single condition to evaluate.                                                                                                                     |
| `whenAll`  | `T`                                                                                                                     | Multiple conditions to evaluate.                                                                                                                  |
| `fallback` | `ReactNode`                                                                                                             | Content to render if `when` is falsy or `whenAll` contains some falsy elements.                                                                   |
| `children` | `ReactNode \| ((data: NoInfer<IsEqual<W, never> extends true ? NonNullableElements<T> : NonNullable<W>>) => ReactNode)` | Children callback that receives `when` or `whenAll` and returns content to render if `when` is truthy or `whenAll` only contains truthy elements. |

| Generic Type | Extends                  | Description                            |
| ------------ | ------------------------ | -------------------------------------- |
| `W`          | `unknown`                | `when`'s type. Single condition.       |
| `const T`    | `ReadonlyArray<unknown>` | `whenAll`'s type. Tuple of conditions. |

### For

Component for rendering lists.

```jsx
// simple check
const result1 = (
  <Show when={show} fallback={`I am visible if 'show' is falsy.`}>
    I am visible if 'show' is truthy.
  </Show>
);

// multiple conditions
const result1 = <Show when={[show, !hidden]}>I am visible if all conditions are truthy.</Show>;

// use when's value
const result2 = <Show when={nullableArray}>{(data) => data.length}</Show>;

// use whenAll's values
const result2 = (
  <Show when={[nullableArray, nullableObject]} fallback={'Something went wrong!'}>
    {([array, object]) => array.length + object.numberProperty}
  </Show>
);
```

| Prop       | Type                                             | Description                                                                  |
| ---------- | ------------------------------------------------ | ---------------------------------------------------------------------------- |
| `each`     | `ReadonlyArray<I>`                               | Array to iterate over.                                                       |
| `keyFn`    | `(item: NoInfer<I>, index: number) => Key`       | Function that returns the key for each item.                                 |
| `children` | `(item: NoInfer<I>, index: number) => ReactNode` | Function that returns the content for each item. No need to define key here. |
| `fallback` | `ReactNode`                                      | Content to render if `each` is empty.                                        |

| Generic Type | Extends                | Description              |
| ------------ | ---------------------- | ------------------------ |
| `I`          | `NonNullable<unknown>` | `each`'s elements' type. |
