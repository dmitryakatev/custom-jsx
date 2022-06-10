const TEXT = 'txt';

export const TYPE_COMPONENT = {
  TEXT: 0,
  NODE: 1,
  COMPONENT: 2,
};

export const TYPE_ATTR = {
  ATTRS: 'attrs',
  STYLE: 'style',
  CLASS: 'class',
  LINK: 'link',
};

const getChildren = (raw, accumulate) => {
  const ln = raw.length;

  for (let i = 0; i < ln; ++i) {
    const child = raw[i];

    if (Array.isArray(child)) {
      getChildren(child, accumulate);
    } else {
      if (typeof child === 'string') {
        accumulate.push(window.jsx.createElement(TEXT, null, [child]));
      } else {
        accumulate.push(child);
      }
    }
  }

  return accumulate;
}

window.jsx = {
  Fragment: () => null, // TODO
  createElement: (tag, attrs, ...children) => {
    const attrObj = {};
    const eventObj = {};

    let styleObj;
    let classesObj;
    let link;
  
    if (attrs) {
      for (const attr in attrs) {
        const value = attrs[attr];
  
        switch (attr) {
          case TYPE_ATTR.LINK:
            link = value;
            break;
          case TYPE_ATTR.STYLE:
            styleObj = value;
            break;
          case TYPE_ATTR.CLASS:
            classesObj = value;
            break;
          default:
            if (attr.substr(0, 2) === 'on') {
              const name = attr.substr(2).toLowerCase();
              eventObj[name] = value;
            } else {
              attrObj[attr] = value;
            }
            break;
        }
      }
    }

    let type;
    let name;
    let childs;

    if (tag === TEXT) {
      type = TYPE_COMPONENT.TEXT;
      name = null;
      childs = [];
      attrObj.text = children[0];
    } else {
      type = typeof tag === 'string' ? TYPE_COMPONENT.NODE : TYPE_COMPONENT.COMPONENT;
      name = tag;
      childs =  getChildren(children, []);
    }
  
    return {
      type,
      tag: name,
      node: null,
      link: link ?? null,
      attrs: attrObj,
      style: styleObj ?? {},
      classes: classesObj ?? {},
      events: eventObj,
      children: childs,
    }
  },
};
