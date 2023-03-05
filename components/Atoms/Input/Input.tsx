import React, { forwardRef, ForwardedRef, ReactNode } from "react";
import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";
import Valid from "../../../public/Valid";

import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  dirty?: unknown;
  label?: string;
  id: string;
  type?: string;
  className?: string;
  placeholder?: string;
}

const Input = forwardRef(
  ({ error, dirty, label, id, type = "text", ...rest }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    let component: ReactNode;

    Input.displayName = "Input";

    component = <input aria-invalid={!!error} id={id} name={id} type={type} ref={ref} {...rest} />;

    return (
      <div className={styles.inputContainer}>
        <>
          {component}
          {error && error.message}
          {dirty && !error && <Valid width="2em" height="" />}
        </>
      </div>
    );
  }
);

export default Input;
