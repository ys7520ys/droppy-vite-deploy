import React from "react";
import { useDrop } from "react-dnd";
import componentMap from "./componentMap"; // componentMap 별도 분리해도 됨

const DropCanvas = ({ components, onDrop, onDelete, onEdit, onBoxEdit, onUpdate }) => {
  const DropZone = ({ index }) => {
    const [{ isOver }, dropRef] = useDrop(() => ({
      accept: "COMPONENT",
      drop: (item) => onDrop(item, index),
      collect: (monitor) => ({ isOver: monitor.isOver() }),
    }));

    return (
      <div
        ref={dropRef}
        style={{
          height: 40,
          border: "2px dashed #fff",
          margin: "10px 0",
          background: isOver ? "#444" : "transparent",
        }}
      />
    );
  };

  return (
    <div style={{ flex: 1, padding: "0 20px", background: "#222", minHeight: 400, paddingTop: 200 }}>
      {components.map((comp, i) => {
        const Comp = componentMap[comp.type];
        return (
          <React.Fragment key={comp.id ?? i}>
            <DropZone index={i} />
            <div style={{ border: "2px dashed white", marginBottom: 20, position: "relative" }}>
              <Comp
                {...comp}
                onEdit={(newData) => onEdit(i, newData)}
                onBoxEdit={(updatedData) => onBoxEdit(i, updatedData)}
                onUpdate={(updatedData) => onUpdate(i, updatedData)}
              />
              <button
                onClick={() => onDelete(i)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "#f33",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                삭제
              </button>
            </div>
          </React.Fragment>
        );
      })}
      <DropZone index={components.length} />
    </div>
  );
};

export default DropCanvas;
