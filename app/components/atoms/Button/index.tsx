import cx from 'classcat'
import type { ComponentPropsWithoutRef } from 'react'

export default function TextInput(props: ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      {...props}
      className={cx([
        'px-4 py-2 text-center rounded-md font-medium bg-purple-400 disabled:bg-purple-200',
        props.className,
      ])}
    >
      {props.children}
    </button>
  )
}
