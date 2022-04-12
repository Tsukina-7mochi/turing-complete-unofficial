import axios from 'axios';
import JSON5 from 'json5';

interface Link {
  text: string,
  href: string
}

interface Menu {
  title?: string,
  collapsible?: boolean,
  contents: (string | Link | Menu)[]
}


interface Page {
  title: string,
  filename: string,
  category: string,
  dependencies: string[] | undefined,
}

interface PageInfo {
  menu: Menu,
  pages: {
    [key: string]: Page
  },
  alias: {
    [key: string]: string
  }
}

const pageInfo: {
  data: PageInfo | null,
  ready: Promise<void>
} = {
  data: null,
  ready: axios.get(`page_info.json5`, {
    baseURL: window.location.origin + window.location.pathname
  }).then((response) => {
    pageInfo.data = JSON5.parse<PageInfo>(response.data);
  }).catch((err) => {
    throw Error('Failed to fetch or parse level info', err);
  })
}

const toLinkName = (name: string): string | null => {
  if(pageInfo.data !== null) {
    if(name in pageInfo.data.alias) {
      return pageInfo.data.alias[name];
    }
  }

  return name.toLowerCase().replace(/[^a-z0-9_ -]/g, '').replace(/[ -]/g, '_');
}

export {
  pageInfo,
  toLinkName,
  Link,
  Menu,
  PageInfo,
};