import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createSlug = (str: string) => {
  return str.toLowerCase().replace(/ /g, "-");
};

export const getRecipes = async () => {
  const res = await fetch("https://dummyjson.com/recipes");
  const data = await res.json();
  return data;
};
