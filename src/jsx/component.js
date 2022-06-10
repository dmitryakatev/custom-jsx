import {
  TYPE_COMPONENT,
} from './jsx';

import {
  updateAttrs,
  updateClasses,
  updateStyles,
} from './attrs';

const renderChildren = (node, children) => {
  const ln = children.length;

  for (let i = 0; i < ln; ++i) {
    const child = createElement(children[i]);
    node.appendChild(child);
  }
};

const addEvents = (node, events) => {
  for (const name in events) {
    node.addEventListener(name, events[name]);
  }
};

const types = new Map([
  [TYPE_COMPONENT.TEXT, (v) => (
    document.createTextNode(v.attrs.text)
  )],
  [TYPE_COMPONENT.NODE, (v) => {
    const node = document.createElement(v.tag);

    updateAttrs(node, {}, v.attrs, v.tag);
    updateClasses(node, {}, v.classes);
    updateStyles(node, {}, v.style);

    addEvents(node, v.events);
    renderChildren(node, v.children);
    
    return node;
  }],
  [TYPE_COMPONENT.COMPONENT, (v) => (
    createElement(v.tag.dom)
  )],
])

export const createElement = (virtual) => {
  const create = types.get(virtual.type);
  const node = create(virtual);

  virtual.node = node;

  return node;
};

const initLinks = (links, virtual) => {
  if (virtual.link) {
    links.set(virtual.link, virtual);
  }

  virtual.children.forEach((child) => {
    initLinks(links, child);
  });
};

export class Component {
  constructor(props) {
    this.props = props ?? {};
    this.links = new Map();
    this.dom = this.onInit();
    initLinks(this.links, this.dom);
  }

  render(root) {
    const element = createElement(this.dom);
    root.appendChild(element);
  }

  setAttr(link, attrs) {
    const virtual = this.links.get(link);

    if (virtual) {
      const { style, classes, ...attr } = attrs;
      const { tag, node } = virtual;

      if (style) {
        updateStyles(node, virtual.style, style);
      }

      if (classes) {
        updateClasses(node, virtual.classes, classes);
      }

      updateAttrs(node, virtual.attrs, attr, tag);
    }
  }
}
