状态使用 enum 代替 object

```js
const activity = {
  START: 'START',
  END: 'END'
}

if (activity.START) {
  `do something`
}
```

good
```ts
enum activity {
  'START',
  'END'
}

if (activity.START) {
  `do something`
}
```