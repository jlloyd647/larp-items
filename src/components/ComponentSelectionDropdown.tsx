import React, { useEffect, useState } from "react";
import { Component } from "@/confluxTypes";

interface ComponentSelectionDropdownProps {
  components: Component[];
  selectedComponentIds?: number[];
  onSelect: (selectedIds: number[]) => void;
}

const predefinedComponents = [
  { id: -1, name: "Crystal (Any)" },
  { id: -2, name: "Fiber (Any)" },
  { id: -3, name: "Herbal (Any)" },
  { id: -4, name: "Liquid (Any)" },
  { id: -5, name: "Metal (Any)" },
  { id: -6, name: "Viscera (Any)" },
  { id: -7, name: "Wood (Any)" },
];

const ComponentSelectionDropdown: React.FC<ComponentSelectionDropdownProps> = ({
  components,
  selectedComponentIds = [],
  onSelect,
}) => {
  const [internalSelectedIds, setInternalSelectedIds] = useState<number[]>(selectedComponentIds);
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
  const [levels, setLevels] = useState<{ [id: number]: number }>({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (id: number) => {
    const updatedSelection = internalSelectedIds.includes(id)
      ? internalSelectedIds.filter((selectedId) => selectedId !== id)
      : [...internalSelectedIds, id];

    setInternalSelectedIds(updatedSelection);
    onSelect(updatedSelection);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  const handleLevelChange = (id: number, level: number) => {
    setLevels((prev) => ({ ...prev, [id]: level }));
  };

  const filterComponents = (list: { id: number; name: string }[]) => {
    const regex = new RegExp(searchTerm.replace(/\*/g, ".*"), "i");
    return list.filter((item) => regex.test(item.name));
  };

  const filteredPredefinedComponents = filterComponents(predefinedComponents);
  const filteredComponents = filterComponents(components);

  return (
    <div className="relative space-y-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />

      <div className="border border-gray-300 rounded-md shadow-sm max-h-40 overflow-y-auto p-2">
        <ul className="space-y-2">
          {filteredPredefinedComponents.map((component) => (
            <li key={component.id} className="flex items-center px-4 py-2">
              <input
                type="checkbox"
                id={`component-${component.id}`}
                checked={internalSelectedIds.includes(component.id)}
                onChange={() => handleCheckboxChange(component.id)}
                className="mr-2"
              />
              <label htmlFor={`component-${component.id}`} className="text-sm">
                {component.name}
              </label>
            </li>
          ))}
          {filteredComponents.map((component) => (
            <li key={component.id} className="flex items-center px-4 py-2">
              <input
                type="checkbox"
                id={`component-${component.id}`}
                checked={internalSelectedIds.includes(component.id)}
                onChange={() => handleCheckboxChange(component.id)}
                className="mr-2"
              />
              <label htmlFor={`component-${component.id}`} className="text-sm">
                {component.name}
                {"type" in component && component.type !== undefined ? ` | ${component.type}` : ""}
                {"level" in component && component.level !== undefined ? ` | L${component.level}` : ""}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {internalSelectedIds.length > 0 && (
        <div className="space-y-2">
          {internalSelectedIds.map((id) => {
            const component = predefinedComponents.find((comp) => comp.id === id) ||
              components.find((comp) => comp.id === id);
            return (
              <div key={id} className="flex items-center justify-between space-x-4">
                <span className="text-sm font-medium">{component?.name}</span>
                {id < 0 ? (
                  <>
                    <select
                      value={levels[id] || 1}
                      onChange={(e) => handleLevelChange(id, Number(e.target.value))}
                      className="w-24 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      {[1, 2, 3].map((level) => (
                        <option key={level} value={level}>
                          Level {level}
                        </option>
                      ))}
                    </select>
                    <div className="flex items-center space-x-2">
                      <label className="text-sm">Qty:</label>
                      <input
                        type="number"
                        min="1"
                        value={quantities[id] || 1}
                        onChange={(e) => handleQuantityChange(id, Number(e.target.value))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </>
                ) : (
                  <input
                    type="number"
                    min="1"
                    value={quantities[id] || 1}
                    onChange={(e) => handleQuantityChange(id, Number(e.target.value))}
                    className="w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ComponentSelectionDropdown;