import * as React from "react";

interface Props {
  width: string;
  height: string;
  color: string;
  style?: object;
}

function Heart({ width, height, color, style }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path
        d="M37.884 19.87c1.96-3.21 2.599-7.186 1.746-10.883-1.822-8.422-11.914-11.863-18.2-6.22-.497.445-.94.956-1.43 1.467-.49-.51-.933-1.022-1.43-1.466C12.284-2.876 2.192.565.37 8.987c-.853 3.697-.215 7.673 1.746 10.882 3.432 5.625 8.965 10.005 14.363 13.975a5.94 5.94 0 007.043 0c5.397-3.97 10.93-8.35 14.362-13.975z"
        fill={color}
      />
    </svg>
  );
}

export default Heart;
