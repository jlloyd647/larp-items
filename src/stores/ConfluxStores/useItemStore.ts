import { Component } from './../../confluxTypes/index';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ComponentState = {
  components: Component[];
  setComponents: (skills: Component[]) => void;
  getComponentById: (id: number) => Component | undefined;
  getComponentsByIds: (ids: number[]) => Component[];
  addComponent: (component: Component) => void;
  updateComponent: (updatedComponent: Component) => void;
  deleteComponent: (componentId: number) => void;
};

const componentData: Component[] = [];

export const useComponentStore = create<ComponentState>()(
  persist(
    (set, get) => ({
      components: componentData,

      setComponents: (components: Component[]) => set({ components }),

      getComponentById: (id) => get().components.find((component) => component.id === id),

      getComponentsByIds: (ids) =>
        get().components.filter((component) => ids.includes(component.id)),

      addComponent: (component) =>
        set((state) => ({
          components: [...state.components, component],
        })),

      updateComponent: (updatedComponent) =>
        set((state) => ({
          components: state.components.map((component) =>
            component.id === updatedComponent.id ? updatedComponent : component
          ),
        })),

      deleteComponent: (componentId: number) =>
        set((state) => ({
          components: state.components.filter((c) => c.id !== componentId),
        })),
    }),
    {
      name: 'component-storage',
    }
  )
);
