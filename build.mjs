import * as esbuild from 'esbuild'
import { join } from 'node:path'


await esbuild.build({
  entryPoints: [join(import.meta.dirname, 'server.ts')],
  bundle: true,
  outfile: 'dist/server.js',
  sourcemap: true,
  platform: 'node',
})