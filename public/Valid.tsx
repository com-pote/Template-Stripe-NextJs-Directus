import * as React from "react";

function Valid({ width, height }) {
  return (
    <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20z" fill="var(--opacity)" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.194 15.549c.813.628 1.05 1.831.533 2.758-4.007 7.192-7.652 11.978-9.807 14.54-1.159 1.377-3.022 1.554-4.336.352-1.875-1.717-4.632-4.63-7.27-8.874a2.17 2.17 0 01.23-2.558l1.588-1.773c.74-.826 1.955-.848 2.701-.03a105.085 105.085 0 014.664 5.498s2.994-4.856 7.643-10.745c.642-.814 1.75-.951 2.555-.329l1.5 1.16z"
        fill="var(--primary)"
      />
    </svg>
  );
}

export default Valid;
