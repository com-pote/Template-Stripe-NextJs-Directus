import { forwardRef, useMemo } from "react";
import { GrCheckmark } from "react-icons/gr";
import { Input } from "@nextui-org/react";

import styles from "./Input.module.css";

const InputRef = forwardRef(({ error, dirty, label, id, type = "text", helperText, helperColor, ...rest }, ref) => {
  let component;

  InputRef.displayName = "Input";

  // if you won't use textarea, you can delete this part
  if (type === "textarea") {
    component = <textarea aria-invalid={!!error} className={styles.textarea} id={id} name={id} ref={ref} {...rest} />;
    return (
      <div className={styles.textare}>
        {component}
        {error && <p className={styles.error}>{error.message}</p>}
        {dirty && !error && <GrCheckmark className={styles.mark} />}
      </div>
    );
  }

  // if you won't use checkbox, you can delete this part and the classes checkbox, checkboxContainer and checkboxLabel
  if (type === "checkbox") {
    component = (
      <div className={styles.checkboxContainer}>
        <input aria-invalid={!!error} className="" id={id} name={id} type="checkbox" {...rest} />
        <span className={styles.checkboxLabel} />
      </div>
    );
  }

  if (type === "password") {
    component = (
      <Input.Password
        labelPlaceholder="Password"
        initialValue=""
        aria-invalid={!!error}
        id={id}
        name={id}
        type="password"
        ref={ref}
        {...rest}
        helperText={helperText ? helperText : ""}
        helperColor={helperColor ? helperColor : ""}
      />
    );
  }

  // if you won't use input, you can delete this part
  if (type !== "checkbox" && type !== "textarea" && type !== "password") {
    component = (
      <Input
        labelPlaceholder={label}
        aria-invalid={!!error}
        id={id}
        name={id}
        type={type}
        ref={ref}
        helperText={helperText ? helperText : ""}
        helperColor={helperColor ? helperColor : ""}
        {...rest}
      />
    );
  }

  return (
    <div className={styles.inputContainer}>
      {component}
      {error && <p className={styles.error}>{error.message}</p>}
      {dirty && !error && <GrCheckmark className={styles.mark} />}
    </div>
  );
});

export default InputRef;
