import cx from 'classcat'
import type { ComponentPropsWithoutRef } from 'react'

type Props = {
  svg?: JSX.Element
}

export default function TextInput({
  svg,
  className,
  ...rest
}: Props & ComponentPropsWithoutRef<'input'>) {
  return (
    <div className={cx(['relative rounded-md shadow-sm', className])}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {svg}
      </div>
      <input
        {...rest}
        className={cx([
          'py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md',
          svg ? 'pl-10' : 'pl-2',
        ])}
      />
    </div>
  )
}
