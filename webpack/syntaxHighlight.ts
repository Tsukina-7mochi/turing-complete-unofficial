const strIsNumber = (token: string): boolean => /(0b|0x)[0-9]+/.test(token);

type blank = 0;
type number_ = 1;
type identifier = 2;
type symbol_ = 3;

interface token {
  text: string,
  type: blank | number_ | identifier | symbol_
}

const codeSplitter = function*(code: string): Generator<token, void> {
  let index = 0;
  while(index < code.length) {
    const slice = code.slice(index);

    const blankMatch = slice.match(/^\s+/);
    if(blankMatch) {
      index += blankMatch[0].length;

      yield { text: blankMatch[0], type: 0 };
      continue;
    }

    const numberMatch = slice.match(/^(0x|0b)?\d+/);
    if(numberMatch) {
      index += numberMatch[0].length;

      yield { text: numberMatch[0], type: 1 };
      continue;
    }

    const identifierMatch = slice.match(/^\w+/);
    if(identifierMatch) {
      index += identifierMatch[0].length;

      yield { text: identifierMatch[0], type: 2 };
      continue;
    }

    // 1文字をidentifierとして返す
    index += 1;

    yield { text: slice[0], type: 3 };
    continue;
  }

  return;
}

const assembly = function(code: string): string {
  const tokens = [...codeSplitter(code)];

  // console.log(tokens);

  // 整形・強調のための情報を収集
  const reserved = ['const', 'label'];
  const constants: string[] = [];
  const labels = [];

  for(let i = 0; i < tokens.length; i++) {
    if(tokens[i].text === 'const') {
      for(let j = i + 1; j < tokens.length; j++) {
        if(tokens[j].type !== 0 || tokens[j].text.includes('\n')) {
          if(tokens[j].type === 2) {
            constants.push(tokens[j].text);
          }

          break;
        }
      }
    }

    if(tokens[i].text === 'label') {
      for(let j = i + 1; j < tokens.length; j++) {
        if(tokens[j].type !== 0 || tokens[j].text.includes('\n')) {
          if(tokens[j].type === 2) {
            labels.push(tokens[j].text);
          }

          break;
        }
      }
    }
  }

  let output = '';
  let inComment = false;
  for(let i = 0; i < tokens.length; i++) {
    if(tokens[i].type === 0) {
      output += tokens[i].text;

      if(tokens[i].text.includes('\n')) {
        inComment = false;
      }
    } else if(inComment) {
      output += `<span class="comment">${tokens[i].text}</span>`;
    } else if(tokens[i].text === '#') {
      inComment = true;

      output += `<span class="comment">#</span>`;
    } else if(reserved.includes(tokens[i].text)) {
      output += `<span class="reserved">${tokens[i].text}</span>`;
    } else if(constants.includes(tokens[i].text)) {
      output += `<span class="constant">${tokens[i].text}</span>`;
    } else if(labels.includes(tokens[i].text)) {
      output += `<span class="label">${tokens[i].text}</span>`;
    } else if(tokens[i].type === 1) {
      output += `<span class="number">${tokens[i].text}</span>`;
    } else if(tokens[i].type === 3) {
      output += `<span class="symbol">${tokens[i].text}</span>`;
    } else {
      output += `<span class="instruction">${tokens[i].text}</span>`;
    }
  }

  return output;
}

export default {
  assembly
}