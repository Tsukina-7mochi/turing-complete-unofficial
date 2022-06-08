class ClassList {
  list = new Set<string>();

  add(className: string): void {
    this.list.add(className);
  }

  remove(className: string): void {
    this.list.delete(className);
  }

  toggle(className: string): void {
    if(this.list.has(className)) {
      this.remove(className);
    } else {
      this.add(className);
    }
  }

  replace(oldName: string, newName: string): void {
    if(this.list.has(oldName)) {
      this.remove(oldName);
      this.add(newName);
    }
  }
}

class SimpleHTMLElement {
  tag: string;
  attributes: {[key: string]: string} = {};
  children: (SimpleHTMLElement | string)[] = [];
  classList: ClassList = new ClassList();

  constructor(tag: string) {
    this.tag = tag;
  }

  appendChild(child: SimpleHTMLElement | string): void {
    this.children.push(child);
  }

  setAttribute(key: string, value: string): void {
    this.attributes[key] = value;
  }

  toString(): string {
    const attributeStr = Object.keys(this.attributes).map((key) => `${key}="${this.attributes[key]}"`).join(' ');
    const classStr = [...this.classList.list].join(' ');

    if(this.children.length > 0) {
      return `<${this.tag} class="${classStr}" ${attributeStr}>\n${this.children.map(child => child.toString()).join('\n')}\n</${this.tag}>`
    }

    return `<${this.tag} ${attributeStr}>`
  }
}

export default SimpleHTMLElement;