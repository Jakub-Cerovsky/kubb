import type { CreateUsersWithListInputMutationResponse } from '../../models/ts/userController/CreateUsersWithListInput.ts'
import { http } from 'msw'

export function createUsersWithListInputHandler(
  data?: CreateUsersWithListInputMutationResponse | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Response | Promise<Response>),
) {
  return http.post('/user/createWithList', function handler(info) {
    if (typeof data === 'function') return data(info)

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
}
