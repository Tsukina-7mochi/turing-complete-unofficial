import * as esbuild from 'esbuild';

interface Options {
  rebuildOnly?: boolean;
  buildName?: string;
}

const getTimeString = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

/**
 * A plugin that shows build time and number of errors if exists.
 */
const buildResultPlugin = (options?: Options): esbuild.Plugin => {
  const rebuildOnly = options?.rebuildOnly === true;
  const buildName =
    typeof options?.buildName === 'string'
      ? ` \x1b[1m${options.buildName}\x1b[0m`
      : '';
  let startTime = 0;
  let endTime = 0;
  let isFirstTime = true;

  return {
    name: 'build-result-plugin',
    setup(build) {
      build.onStart(() => {
        startTime = Date.now();
      });
      build.onEnd((result) => {
        if (isFirstTime && rebuildOnly) {
          isFirstTime = false;
          return;
        }
        isFirstTime = false;
        endTime = Date.now();
        const timeText = `\x1b[1m${getTimeString()}\x1b[0m`;

        if (result.errors.length > 0) {
          const numErrors = result.errors.length;
          console.log(
            `${timeText} Build${buildName} failed with ${numErrors} errors.`
          );
        } else {
          console.log(
            `\x1b[1m${getTimeString()}\x1b[0m Build${buildName} succeeded in ${
              endTime - startTime
            }ms`
          );
        }
      });
    },
  };
};

export default buildResultPlugin;
