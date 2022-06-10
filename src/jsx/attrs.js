import { TYPE_ATTR } from './jsx';

const defaultProps = new Set();
const properties = new Map([
  ['input', new Set(['value', 'readOnly'])],
  ['textarea', new Set(['value', 'readOnly'])],
  // ...
]);

export const updateStyles = (node, currStyle, nextStyle) => {
  for (const style in nextStyle) {
    const currValue = currStyle[style];
    const nextValue = nextStyle[style];

    if (currValue !== nextValue) {
      currStyle[style] = nextValue;
      node.style[style] = nextValue;
    }
  }
};

export const updateClasses = (node, currClasses, nextClasses) => {
  for (const name in nextClasses) {
    const currValue = currClasses[name] ?? false;
    const nextValue = nextClasses[name];

    if (currValue !== nextValue) {
      currClasses[name] = nextValue;

      if (nextValue) {
        node.classList.add(name);
      } else {
        node.classList.remove(name);
      }
    }
  }
};

export const updateAttrs = (node, currAttrs, nextAttrs, tag) => {
  const props = properties.get(tag) ?? defaultProps;

  for (const attr in nextAttrs) {
    const currValue = currAttrs[attr];
    const nextValue = nextAttrs[attr];

    if (currValue !== nextValue) {
      currAttrs[attr] = nextValue;
  
      if (props.has(attr)) {
        node[attr] = nextValue;
      } else {
        if (nextValue === null) {
          node.removeAttribute(attr);
        } else {
          node.setAttribute(attr, nextValue);
        }
      }
    }
  }
};
