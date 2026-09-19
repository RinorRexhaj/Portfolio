import { useSyncExternalStore } from "react";
import { projects } from "../utils/Projects";

/**
 * The carousel index lives outside React so any section can drive it without a
 * provider wrapping the whole tree. Projects.tsx owns the rendering; Experience
 * links into it by project title.
 */
let selectedIndex = 0;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => selectedIndex;

export const selectProjectIndex = (index: number): void => {
  if (index === selectedIndex || index < 0 || index >= projects.length) return;
  selectedIndex = index;
  listeners.forEach((listener) => listener());
};

/**
 * Select by the title used in ExperienceRole.relatedProjects.
 * Returns false when the title matches no project, so callers can skip the link
 * rather than scrolling the user to an unrelated slide.
 */
export const selectProjectByTitle = (title: string): boolean => {
  const index = projects.findIndex((project) => project.title === title);
  if (index === -1) return false;
  selectProjectIndex(index);
  return true;
};

export const hasProject = (title: string): boolean =>
  projects.some((project) => project.title === title);

export const useSelectedProjectIndex = (): number =>
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
