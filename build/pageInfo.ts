import JSON5 from 'json5';
import path from 'path';
import fs from 'fs';

interface Link {
  text: string;
  href: string;
}

interface Menu {
  title?: string;
  collapsible?: boolean;
  contents: (string | Link | Menu)[];
}

interface Page {
  title: string;
  filename: string;
  category: string;
  dependencies: string[] | undefined;
}

interface PageInfo {
  menu: Menu;
  pages: {
    [key: string]: Page;
  };
  alias: {
    [key: string]: string;
  };
}

const toLinkName = (pageInfo: PageInfo, name: string) => {
  if (name in pageInfo.alias) {
    return pageInfo.alias[name];
  }

  return name
    .toLowerCase()
    .replace(/[^a-z0-9_ -]/g, '')
    .replace(/[ -]/g, '_');
};

export type { Link, Menu, Page, PageInfo };
export { toLinkName };
