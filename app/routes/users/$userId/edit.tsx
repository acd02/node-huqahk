import {
  ActionFunction,
  Form,
  MetaFunction,
  redirect,
  useActionData,
  useTransition,
} from 'remix'

import Button from '~components/atoms/Button'
import TextInput from '~components/atoms/TextInput'
import { EmailIcon } from '~svg'
import type { Error } from '~types/form'
import { emailRegex } from '~utils/regex'

import { useUserInfos } from '../$userId'

const meta: MetaFunction = ({ parentsData }) => {
  const userName: string | undefined = parentsData['routes/users/$userId']?.name

  return {
    title: `Editing ${userName ?? 'user'}`,
  }
}

const action: ActionFunction = async ({ request, params }) => {
  /* eslint-disable fp/no-mutation */
  const formData = await request.formData()
  const id = formData.get('id') as string | null
  const email = (formData.get('email') ?? '') as string

  const errors: Error = {}

  if (!id || !emailRegex.test(email)) {
    errors.message = 'could not update user email'

    return errors
  }

  // resource will not be really updated on the server but it will be faked as if.
  return fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ email }),
  })
    .then(() => redirect(`/users/${params.userId}`))
    .catch(() => {
      errors.message = 'oops'
      
return errors as unknown as Response
    })
}

function UserEdit() {
  const { email, id, name } = useUserInfos()
  const errors = useActionData<Error>()
  const { state } = useTransition()

  return (
    <>
      <h4 className="my-4 text-2xl font-bold text-gray-900">{`Editing ${name} email:`}</h4>
      <Form className="max-w-xs" method="patch">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <TextInput
          svg={EmailIcon}
          className="mt-1"
          type="email"
          name="email"
          id="email"
          defaultValue={email}
        />
        <input id="id" name="id" hidden type="hidden" value={id} />
        <Button disabled={state === 'submitting'} className="mt-4 min-w-[4rem]">
          {state === 'submitting' ? '...' : 'save'}
        </Button>
        {errors?.message && (
          <span className="block mt-4 bg-red-400 py-2 px-4 rounded-md w-fit">
            {errors.message}
          </span>
        )}
      </Form>
    </>
  )
}

export default UserEdit
export { action, meta }
