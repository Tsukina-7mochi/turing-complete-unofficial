import SimpleHTMLElement from "./simpleHTMLElement";

type Appendable = string | SimpleHTMLElement;

const createElement = function(
  tag: string,
  content?: Appendable,
  className?: string,
  attributes?: Record<string, string>
) {
  const element = new SimpleHTMLElement(tag);
  if(content !== undefined) {
    element.appendChild(content);
  }
  if(className !== undefined) {
    className.split(' ').forEach((className) => element.classList.add(className));
  }
  if(attributes !== undefined) {
    for(const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

  return element;
}

type ListTag = 'ul' | 'ol';
const createList = function(items: Appendable[], tag: ListTag = 'ul') {
  const elList = new SimpleHTMLElement(tag);
  items.forEach((item) => {
    const elItem = createElement('li', item);
    elList.appendChild(elItem);
  });

  return elList;
}

export { createElement, createList }
