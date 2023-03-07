import React, { forwardRef, ForwardedRef, ReactNode } from "react";
import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";
import Valid from "../../../public/Valid";

import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  dirty?: unknown;
  type?: string;
  className?: string;
  placeholder?: string;
}

const Input = forwardRef(({ error, dirty, id, type = "text", ...rest }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  let component: ReactNode;

  Input.displayName = "Input";

  component = <input aria-invalid={!!error} id={id} name={id} type={type} ref={ref} {...rest} />;

  return (
    <div className={styles.inputContainer}>
      <>
        {component}
        {error && (
          <span>
            <>{error.message}</>
          </span>
        )}
        {dirty && !error && <Valid width="2em" height="2em" />}
      </>
    </div>
  );
});

export default Input;
