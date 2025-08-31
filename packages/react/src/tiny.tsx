import { Tinypool } from 'tinypool'
import { fileURLToPath } from 'node:url'
import { Const } from './components/Const.tsx';
import { Text } from './components/Text.tsx';
import type { JSX } from 'react';

const pool = new Tinypool({
  filename: fileURLToPath(new URL('./dist/worker.cjs', import.meta.url)),
  maxThreads: 4, // adjust concurrency
})

async function renderComponents(components: { id: string; component: JSX.Element }[]) {
  const results = await Promise.all(
    components.map((comp) => pool.run({ props: comp }))
  )

  console.log(results)
}

renderComponents([
  { id: '1', component:  <Const name="data" asConst>
      "blue"
    </Const> },
  { id: '2', component:  (<Text>test</Text>)
},
])
