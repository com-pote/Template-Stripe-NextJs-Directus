import * as React from "react";

function Minus({ width, height }) {
  return (
    <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20z" fill="var(--opacity)" />
      <path
        d="M15.008 21.117c-.95.034-1.786.579-1.92 1.521A9.73 9.73 0 0013 24c0 .538.036.989.089 1.362.133.942.968 1.487 1.92 1.521C16.5 26.937 19.263 27 24 27s7.5-.063 8.992-.117c.95-.034 1.786-.579 1.92-1.521A9.73 9.73 0 0035 24a9.73 9.73 0 00-.089-1.362c-.133-.942-.968-1.487-1.92-1.521C31.5 21.063 28.737 21 24 21s-7.5.063-8.992.117z"
        fill="var(--primary)"
      />
    </svg>
  );
}

export default Minus;
