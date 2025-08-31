import { parentPort } from 'node:worker_threads'
import { ReactTemplate } from './ReactTemplate'

const template = new ReactTemplate({
  debug: false,
  stdout: { write: () => {} } as any,
  stderr: { write: () => {} } as any,
})

parentPort?.on('message', async (job: { props: any }) => {
  try {
    // Render your component using ReactTemplate
    const result = await template.renderToString(job.props.component)

    parentPort?.postMessage({ result, id: job.props.id })
  } catch (error) {
    parentPort?.postMessage({ error: (error as Error).message, id: job.props.id })
  }
})
