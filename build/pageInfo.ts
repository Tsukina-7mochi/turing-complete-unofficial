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

// TODO: pathの宣言をwebpack.common.jsと共通の場所に移す
const docsPath = path.join(__dirname, '../docs');
const pageInfo = JSON5.parse<PageInfo>(
  fs.readFileSync(path.join(docsPath, 'page_info.json5')).toString()
);

const toLinkName = (name: string): string | null => {
  if (name in pageInfo.alias) {
    return pageInfo.alias[name];
  }

  return name
    .toLowerCase()
    .replace(/[^a-z0-9_ -]/g, '')
    .replace(/[ -]/g, '_');
};

export { pageInfo, toLinkName, Link, Menu, PageInfo };
