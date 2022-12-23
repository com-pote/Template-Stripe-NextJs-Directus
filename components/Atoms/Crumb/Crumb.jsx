import { Text } from "@nextui-org/react";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import styles from "./Crumb.module.css";

const Crumb = ({ text: defaultText, textGenerator, href, last = false }) => {
  const [text, setText] = useState(defaultText);

  useEffect(() => {
    // If `textGenerator` is nonexistent, then don't do anything
    if (!Boolean(textGenerator)) {
      return;
    }
    // Run the text generator and set the text again
    const finalText = textGenerator();
    setText(finalText);
  }, [textGenerator]);

  if (last) {
    return (
      <>
        <Text color="neutral" className={styles.last}>
          {text && decodeURI(text)}
        </Text>
      </>
    );
  }

  return (
    <div className={styles.link}>
      <Link color="primary" href={href}>
        {text && decodeURI(text)}
      </Link>
      &nbsp;
      <AiOutlineRight />
      &nbsp;
    </div>
  );
};

export default Crumb;
