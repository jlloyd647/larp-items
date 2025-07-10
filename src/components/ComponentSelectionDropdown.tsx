import React from "react";
import { Component } from "@/confluxTypes";

interface ComponentSelectionDropdownProps {
  components: Component[];
  selectedComponentId?: number;
  onSelect: (componentId: number) => void;
}

const ComponentSelectionDropdown: React.FC<ComponentSelectionDropdownProps> = ({
  components,
  selectedComponentId,
  onSelect,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor="component-dropdown" className="block text-sm font-medium text-gray-700">
        Select Component
      </label>
      <select
        id="component-dropdown"
        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={selectedComponentId}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="" disabled>
          -- Select a Component --
        </option>
        {components.map((component) => (
          <option key={component.id} value={component.id}>
            {component.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ComponentSelectionDropdown;