import React, { LegacyRef, forwardRef } from 'react';

interface IButtonContainerProps {
  loading?: boolean
  loadingComponent?: React.ReactNode
  children: React.ReactNode
  className: string
  ref: any
  disabled?: boolean
  onClick?: (e: any) => any
  type?: "submit" | "reset" | "button" | undefined
  form?: string
}

const ButtonContainer = forwardRef<LegacyRef<HTMLButtonElement> | any, IButtonContainerProps>((_, ref?) => {
  return (
    <button
      ref={ref}
      className={_.className}
      onClick={_.onClick}
      aria-disabled={_?.disabled}
      type={_.type}
      form={_.form}
      disabled={_.loading || _?.disabled}
    >
      {_.loading ? _.loadingComponent : _.children}
    </button>
  );
})

export default ButtonContainer

export {
  IButtonContainerProps
}
