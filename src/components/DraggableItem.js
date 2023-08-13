import React from "react";
import { Draggable } from "react-beautiful-dnd";

const DraggableItem = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{
            userSelect: "none",
            padding: 16,
            margin: "0 0 8px 0",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: 4,
            ...provided.draggableProps.style,
          }}
        >
          {item.listName}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
