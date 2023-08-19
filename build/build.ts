import * as esbuild from 'esbuild';
import { pageOptions, srcOption } from './options';

let devFlag = false;
let watchFlag = false;
for (const arg of process.argv) {
  if (arg.startsWith('--')) {
    if (arg === '--dev') {
      devFlag = true;
    }
    if (arg === '--watch') {
      watchFlag = true;
    }
  }
  if (arg.startsWith('-')) {
    if (arg === '-d') {
      devFlag = true;
    }
    if (arg === '-w') {
      watchFlag = true;
    }
  }
}

(async () => {
  const ctxs = await Promise.all([
    esbuild.context(srcOption(devFlag)),
    ...pageOptions().map(option => esbuild.context(option))
  ]);

  if (devFlag && watchFlag) {
    await Promise.all(ctxs.map((ctx) => ctx.watch()));
    console.log('Watching...');

    // eslint-disable-next-line
    for await (const _ of process.stdin) {
      // manually rebuild
      await Promise.all(ctxs.map((ctx) => ctx.rebuild()));
    }
  } else {
    await Promise.all(ctxs.map((ctx) => ctx.rebuild()));
  }

  await Promise.all(ctxs.map((ctx) => ctx.dispose()));
})();
