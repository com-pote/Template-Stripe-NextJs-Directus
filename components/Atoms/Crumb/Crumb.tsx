import { useEffect, useState } from "react";
import styles from "./Crumb.module.scss";
import Link from "next/link";
import { capitalize } from "../../../lib/utils";

const Crumb = ({
  default: defaultText,
  textGenerator,
  href,
  last = false,
}: {
  default: string;
  textGenerator: () => string;
  href: string;
  last: unknown;
}) => {
  const [text, setText] = useState(defaultText);

  useEffect(() => {
    // If `textGenerator` is nonexistent, then don't do anything
    if (!textGenerator) {
      return;
    }
    // Run the text generator and set the text again
    const finalText = textGenerator();
    setText(finalText);
  }, [textGenerator]);

  if (last) {
    return (
      <>
        <span className={styles.last}>{text && capitalize(decodeURI(text))}</span>
      </>
    );
  }

  return (
    <div className={styles.link}>
      <Link href={href}>{text && decodeURI(text)}</Link>
      <span>&nbsp; &gt; &nbsp;</span>
    </div>
  );
};

export default Crumb;
