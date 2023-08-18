/* eslint-env node */

const path = require('path');
const json5 = require('json5');
const fs = require('fs');
const { title } = require('process');

const pageInfo = json5.parse(
  fs.readFileSync(path.join(__dirname, '../docs/page_info.json5'))
);

if (Array.isArray(pageInfo)) {
  throw Error('pageInfo must be object, not array');
}

if (!('pages' in pageInfo)) {
  throw Error('pageInfo must have pageName "pages"');
}
if (typeof pageInfo.pages !== 'object') {
  throw Error(`pageInfo.pages must be object not ${typeof pageInfo.pges}.`);
}
if (Array.isArray(typeof pageInfo.pages)) {
  throw Error('pageInfo.pages must be object, not array');
}
for (const pageName in pageInfo.pages) {
  const page = pageInfo.pages[pageName];
  if (!('title' in page)) {
    console.error(`page ${pageName} does not have "title" field.`);
  }
  if (typeof page.title !== 'string') {
    console.error(
      `page ${pageName}: "title" must be string, not ${typeof page.title}`
    );
  }

  if (!('filename' in page)) {
    console.error(`page ${pageName} does not have "filename" field.`);
  }
  if (typeof page.filename !== 'string') {
    console.error(
      `page ${pageName}: "filename" must be string, not ${typeof page.filename}`
    );
  }

  if (!('category' in page)) {
    console.error(`page ${pageName} does not have "category" field.`);
  } else {
    if (typeof page.category !== 'string') {
      console.error(
        `page ${pageName}: "category" must be string, not ${typeof page.category}`
      );
    } else if (
      !['level', 'achievements', 'others', 'test'].includes(page.category)
    ) {
      console.error(
        `page ${pageName} has unknown category value "${page.category}"`
      );
    } else {
      if (page.category === 'level') {
        if (!('dependencies' in page)) {
          console.error(
            `page ${pageName} does not have "dependencies" field despite its category is "level".`
          );
        } else if (!Array.isArray(page.dependencies)) {
          console.error(
            `page ${pageName}: dependencies must be array, not ${typeof page.dependencies}`
          );
        } else {
          page.dependencies.forEach((dependency) => {
            if (typeof dependency !== 'string') {
              console.error(
                `page ${pageName}: item of dependencies must be string, but got ${dependency}(${typeof dependency})`
              );
            } else if (!(dependency in pageInfo.pages)) {
              console.error(
                `page ${pageName}: dependency page ${dependency} does not exist.`
              );
            } else if (dependency === pageName) {
              console.error(`page ${pageName} depends on itself.`);
            }
          });
        }
      }
    }

    for (const key in page) {
      if (!['title', 'filename', 'category', 'dependencies'].includes(key)) {
        console.error(`page ${pageName} has unknown key "${key}"`);
      } else if (key === 'dependencies' && page.category !== 'level') {
        console.error(
          `page ${pageName} has key "dependencies" despite its category is "${page.category}"`
        );
      }
    }
  }
}

// alias
if ('alias' in pageInfo) {
  if (Array.isArray(pageInfo.alias)) {
    console.error(`pageInfo.alias must be object, not array`);
  }

  for (const key in pageInfo.alias) {
    if (typeof pageInfo.alias[key] !== 'string') {
      console.error(
        `value of pageInfo.alias.${key} must be string, not ${typeof pageInfo
          .alias[key]}`
      );
    } else if (!(pageInfo.alias[key] in pageInfo.pages)) {
      console.error(
        `${pageInfo.alias[key]} (alias of ${key}) is not known page name.`
      );
    }
  }
}

if (!('menu' in pageInfo)) {
  console.error('pageInfo must have pageName "menu"');
}

const checkMenu = function (root, trace) {
  if (typeof root !== 'object') {
    console.error(`menu must be object, not array`);
  } else if ('title' in root) {
    if (typeof root.title !== 'string') {
      console.error(`menu title must be string, not ${typeof root.title}`);
    }
  }

  if (!('contents' in root)) {
    console.error(`${trace}: each menu must have "contents".`);
  } else if (!Array.isArray(root.contents)) {
    console.error(
      `${trace}: menu.contents must be array, not ${typeof root.contents}`
    );
  } else {
    root.contents.forEach((content, index) => {
      if (typeof content === 'string') {
        if (!(content in pageInfo.pages)) {
          console.error(
            `${trace}.contents[${index}]: ${content} is unknown page.`
          );
        }
      } else if (typeof content === 'object') {
        if ('text' in content && 'href' in content) {
          if (typeof content.text !== 'string') {
            console.error(
              `${trace}.contents[${index}].text must be string, not ${content.text}`
            );
          } else if (typeof content.href !== 'string') {
            console.error(
              `${trace}.contents[${index}].text must be string, not ${content.href}`
            );
          }
        } else {
          checkMenu(content, `${trace}.content[${index}]`);
        }
      }
    });
  }
};

checkMenu(pageInfo.menu, 'pageInfo.menu');
