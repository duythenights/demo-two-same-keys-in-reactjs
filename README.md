# Why Duplicate Keys Break React

An interactive demo showing what happens when two list items share the same `key` prop in React.

## The Bug

```tsx
const [items, setItems] = useState([
  { id: "1", text: "Item A" },
  { id: "1", text: "Item B" }, // same key as Item A
  { id: "3", text: "Item C" },
  { id: "4", text: "Item D" },
]);
```

When you remove **Item A**, React sees that `key="1"` still exists (Item B) and reuses Item A's DOM node instead of removing it. The result: **Item B inherits Item A's input state** — text you typed in one input "jumps" to the other.

## Try It Yourself

1. Type something in each input field
2. Click **Remove Item A**
3. Notice how Item B's input now shows what you typed for Item A

## Why This Happens

React uses `key` to match elements between renders. When two siblings share a key, React can't tell them apart. On re-render it:

1. Sees `key="1"` in both the old and new tree
2. Assumes they're the **same element** — reuses the DOM node
3. Updates the text content (`"Item A"` → `"Item B"`) but **keeps the input state**

This is why React warns:

> ⚠️ Warning: Encountered two children with the same key, `"1"`. Keys should be unique so that components maintain their identity across updates.

## The Fix

Always use unique keys. If your data doesn't have unique IDs, generate them — don't use array indices for lists that can change.

```tsx
// Bad
items.map((item) => <li key={item.id}>...)

// Good — ensure IDs are actually unique
items.map((item) => <li key={item.uniqueId}>...)
```

## Run Locally

```bash
npm install
npm run dev
```

## Stack

- React 19
- TypeScript
- Vite

## License

MIT
