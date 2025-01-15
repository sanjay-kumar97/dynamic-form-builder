import { create } from "zustand";

import { DraggedElement, Element, FormStatus } from "@/types";

type States = {
  formElements: Element[];
  draggedElement: DraggedElement | null;
  dragOverIndex: number | null;
  selectedIndex: number | null;
  formStatus: FormStatus;
};

type Actions = {
  setFormElements: (elements: Element[]) => void;
  setDraggedElement: (element: DraggedElement | null) => void;
  setDragOverIndex: (index: number | null) => void;
  setSelectedIndex: (index: number | null) => void;
  setFormStatus: (status: FormStatus) => void;
};

const useStore = create<States & Actions>((set) => ({
  /* States */
  formElements: [],
  draggedElement: null,
  dragOverIndex: null,
  selectedIndex: null,
  formStatus: "edit",
  /* Actions */
  setFormElements: (elements) => set({ formElements: elements }),
  setDraggedElement: (element) => set({ draggedElement: element }),
  setDragOverIndex: (index) => set({ dragOverIndex: index }),
  setSelectedIndex: (index) => set({ selectedIndex: index }),
  setFormStatus: (status) => set({ formStatus: status }),
}));

export default useStore;
