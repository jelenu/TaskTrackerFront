import React from "react";
import { AddList } from "./AddList";
import { List } from "./List";
import { useState } from "react";

export const Board = () => {
  // State to manage the lists
  const [lists, setLists] = useState([]);

  // Function to add a new list
  const addList = (newListName) => {
    setLists([...lists, { name: newListName }]);
  };

  // Function to update the name of a list
  const updateListName = (index, newName) => {
    const updatedLists = [...lists];
    updatedLists[index].name = newName;
    setLists(updatedLists);
  };
  return (
    <>
      {/* Container for lists and the "AddList" component */}
      <div className="flex m-5">
        {/* Mapping through lists and rendering each "List" component */}
        {lists.map((list, index) => (
          <List
            key={index}
            listName={list.name}
            onUpdateListName={(newName) => updateListName(index, newName)}
          />
        ))}

        {/* "AddList" component to add new lists */}
        <AddList onAddList={addList} />
      </div>
    </>
  );
};
