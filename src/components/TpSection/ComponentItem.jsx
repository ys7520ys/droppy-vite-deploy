import React from "react";
import { useDrag } from "react-dnd";

const ComponentItem = ({ type, label, style }) => {
  const [, dragRef] = useDrag(() => ({ type: "COMPONENT", item: { type } }));
  return (
    <div
      ref={dragRef}
      style={{
        ...style,
        cursor: "grab",
        userSelect: "none",
      }}
    >
      {label}
    </div>
  );
};

export default ComponentItem;
