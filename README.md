# Framework agnostic functions, hooks and components.

## Types

### Result

Result type that functions can use to indicate failure instead of throwing.

```ts
// declare a function that wraps a callback that throws on error and returns a Result
declare function tryCatch<T>(fn: () => T): Result<T>;
```

| Generic Type | Extends   | Description                           |
| ------------ | --------- | ------------------------------------- |
| `T`          | `unknown` | `data`'s type when `success` is true. |

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

<br />

| Generic Type | Extends            | Description                                               |
| ------------ | ------------------ | --------------------------------------------------------- |
| `E`          | `string \| number` | `expression`'s type. Union of strings or numbers.         |
| `CE`         | `E`                | Union of covered `cases`. Subunion of `E` or same as `E`. |
| `const R`    | `unknown`          | Union of return values.                                   |
| `const F`    | `unknown`          | Fallback value.                                           |

### retry

Function that retries a callback function upon failure.

```ts
// try to refresh access token
const result = retry(refreshAccessToken, 3, 60 * 1000);
```

| Parameter | Type                       | Description                                                                                                 |
| --------- | -------------------------- | ----------------------------------------------------- |
| `fn`      | `() => Promise<Result<T>>` | Callback function that we want to retry upon failure. |
| `retries` | `number`                   | Number of retries to attempt.                         |
| `delay`   | `number \| undefined`      | Delay in milliseconds between retries.                |

<br />

| Generic Type | Extends   | Description                           |
| ------------ | --------- | ------------------------------------- |
| `T`          | `unknown` | `data`'s type when `success` is true. |

### switchTrue

Switch true statement with return value.

```ts
const result = switchTrue(
  [
    [() => isA(), () => 'a'],
    [() => isB(), () => 'b'],
  ],
  () => 'c'
);
```

| Parameter  | Type                     | Description                                                                                                                  |
| ---------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `cases`    | `ReadonlyArray<C>`       | Array of tuples. Each tuple has a callback that returns a condition and a callback that will run if the condition is truthy. |
| `fallback` | `(() => F) \| undefined` | Default branch.                                                                                                              |

<br />

| Generic Type | Extends                          | Description                              |
| ------------ | -------------------------------- | ---------------------------------------- |
| `const C`    | `[() => unknown, () => unknown]` | Tuple of condition and result callbacks. |
| `const F`    | `unknown`                        | Fallback value.                          |

## Components

### When

Exhaustive switch component.

```jsx
// handle all cases
const result1 = <When expression={AorB} cases={{ A: () => <A />, B: () => <B /> }} />;

// provide a fallback
const result2 = (
  <When expression={ABC} cases={{ A: () => <A />, B: () => <B /> }} fallback={() => <Abc />} />
);
```

| Prop         | Type                          | Description                                                                                                                      |
| ------------ | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | `E`                           | Expression to evaluate.                                                                                                          |
| `cases`      | `Record<CE, () => ReactNode>` | Record that maps some or all possible values of `expression` to a branch that returns content.                                   |
| `fallback`   | `(() => ReactNode) \| never`  | Default branch that returns content. Mandatory (and only allowed) if `cases` does not cover all possible values of `expression`. |

<br />

| Generic Type | Extends            | Description                                               |
| ------------ | ------------------ | --------------------------------------------------------- |
| `E`          | `string \| number` | `expression`'s type. Union of strings or numbers.         |
| `CE`         | `E`                | Union of covered `cases`. Subunion of `E` or same as `E`. |

### SwitchTrue

Switch true component.

```jsx
const result = (
  <SwitchTrue
    cases={[
      [() => isA(), () => <A />],
      [() => isB(), () => <B />],
    ]}
    fallback={() => <Fallback />}
  />
);
```

| Prop       | Type                                              | Description                                                                                                                                     |
| ---------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `cases`    | `ReadonlyArray<[() => unknown, () => ReactNode]>` | Array of tuples. Each tuple has a callback that returns a condition and a callback that will run if the condition is truthy and return content. |
| `fallback` | `(() => ReactNode) \| undefined`                  | Default branch that returns content.                                                                                                            |

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

| Prop       | Type                                                                                                                    | Description                                                                                                                                         |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `when`     | `W`                                                                                                                     | Single condition to evaluate.                                                                                                                       |
| `whenAll`  | `T`                                                                                                                     | Multiple conditions to evaluate.                                                                                                                    |
| `fallback` | `ReactNode`                                                                                                             | Content to render if `when` is falsy or `whenAll` contains some falsy elements.                                                                     |
| `children` | `ReactNode \| ((data: NoInfer<IsEqual<W, never> extends true ? NonNullableElements<T> : NonNullable<W>>) => ReactNode)` | Content or callback that receives `when` or `whenAll` and returns content to render if `when` is truthy or `whenAll` only contains truthy elements. |

<br />

| Generic Type | Extends                  | Description                            |
| ------------ | ------------------------ | -------------------------------------- |
| `W`          | `unknown`                | `when`'s type. Single condition.       |
| `const T`    | `ReadonlyArray<unknown>` | `whenAll`'s type. Tuple of conditions. |

### For

Component for rendering lists.

```jsx
const result = (
  <For each={array} keyFn={(item) => item.id} fallback={`The array is empty.`}>
    {(item, index) => `#${index} ${item.value}`}
  </For>
);
```

| Prop       | Type                                             | Description                                                                  |
| ---------- | ------------------------------------------------ | ---------------------------------------------------------------------------- |
| `each`     | `ReadonlyArray<I>`                               | Array to iterate over.                                                       |
| `keyFn`    | `(item: NoInfer<I>, index: number) => Key`       | Function that returns the key for each item.                                 |
| `children` | `(item: NoInfer<I>, index: number) => ReactNode` | Function that returns the content for each item. No need to define key here. |
| `fallback` | `ReactNode`                                      | Content to render if `each` is empty.                                        |

<br />

| Generic Type | Extends                | Description              |
| ------------ | ---------------------- | ------------------------ |
| `I`          | `NonNullable<unknown>` | `each`'s elements' type. |

### Repeat

Component to render content multiple times. Useful for displaying the loading skeleton of a list.

```jsx
// skeleton of a list
const result1 = (
  <Repeat times={7}>
    <Skeleton h={16} />
  </Repeat>
);

// chess board
const result2 = (
  <Repeat times={8}>
    {(x) => (
      <div style={{ display: 'flex' }}>
        <Repeat times={8}>
          {(y) => <Field x={x} y={y} />}
        </Repeat>
      </div>
    )}
  </Repeat>
);
```

| Prop       | Type                                        | Description                                                            |
| ---------- | ------------------------------------------- | ---------------------------------------------------------------------- |
| `times`    | `number`                                    | Number of times to repeat content.                                     |
| `children` | `ReactNode \| (index: number) => ReactNode` | Content or callback that receives index and returns content to repeat. |
