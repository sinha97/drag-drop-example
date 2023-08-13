import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ListData from "./ListDataDraggable";
import DraggableItem from "./DraggableItem";
import { toast } from "react-toastify";

const DragAndDropContainer = () => {
  const [leftItems, setLeftItems] = useState(ListData);
  const [rightItems, setRightItems] = useState([]);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // If dropped outside a droppable area or in the same position, do nothing
    if (
      !destination ||
      (destination.draggableId !== source.draggableId &&
        destination.index === source.index)
    ) {
      return;
    }

    // Determine source and destination lists
    const sourceList =
      source.droppableId === "my-droppable-area" ? leftItems : rightItems;
    const destList =
      destination.droppableId === "my-droppable-area" ? leftItems : rightItems;

    // Prevent dropping an item onto the same side
    if (sourceList === destList) {
      return;
    }

    // Copy items arrays to avoid mutating state directly
    const newSourceList = [...sourceList];
    const newDestList = [...destList];

    // Remove item from source list
    const [movedItem] = newSourceList.splice(source.index, 1);

    // Insert item into destination list at the specified index
    newDestList.splice(destination.index, 0, movedItem);

    // Update state for both lists
    if (sourceList === leftItems) {
      setLeftItems(newSourceList);
      setRightItems(newDestList);
      // Display toast message
      toast.info(
        `Dragged "${movedItem.listName}" from Left Side to Right Side`,
        {
          position: "top-right",
          className: "left-toast-custom",
        }
      );
    } else {
      setLeftItems(newDestList);
      setRightItems(newSourceList);
      // Display toast message
      toast.info(
        `Dragged "${movedItem.listName}" from Right Side to Left Side`,
        {
          position: "top-right",
          className: "right-toast-custom",
        }
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Droppable droppableId="my-droppable-area" direction="vertical">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                width: "600px",
                padding: 16,
                border: "1px solid #ccc",
                marginLeft: "30px",
                marginTop: "30px",
              }}
            >
              {leftItems.map((item, index) => (
                <DraggableItem key={item.id} item={item} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="my-droppable-right" direction="vertical">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                width: "600px",
                padding: 16,
                border: "1px solid #ccc",
                marginRight: "30px",
                marginTop: "30px",
              }}
            >
              {rightItems.map((item, index) => (
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
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default DragAndDropContainer;
