import katex, { KatexOptions } from 'katex';

interface convertMathWorkerOptions {
  code: string;
  options: KatexOptions;
}

onmessage = function (e) {
  // console.log(e);

  postMessage(
    katex.renderToString(e.data.code, {
      ...e.data.options,
      throwOnError: false,
    })
  );
};
