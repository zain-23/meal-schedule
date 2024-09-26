import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { createSlug } from "../lib/utils";
import { Recipe } from "../lib/types";

interface ContextType {
  weeklyRecipe: Recipe[];
  handleSetWeeklyRecipe: (recipe: Recipe) => void;
  handleWeeklyRecipeSave: (week: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setWeek: Dispatch<SetStateAction<string>>;
  week: string;
}

const Context = createContext<ContextType | null>(null);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [weeklyRecipe, setWeeklyRecipe] = useState<Recipe[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [week, setWeek] = useState<string>("");

  const handleSetWeeklyRecipe = (recipe: Recipe) => {
    setWeeklyRecipe((prev) => {
      const isWeeklyRecipe = prev.some((r) => r.id === recipe.id);

      if (isWeeklyRecipe) {
        return prev.filter((r) => r.id !== recipe.id);
      }
      return [...prev, recipe];
    });
  };

  const handleWeeklyRecipeSave = (week: string) => {
    if (!week) {
      alert("Please select a week");
      return;
    }
    const storedRecipes: Recipe[] = JSON.parse(
      localStorage.getItem(createSlug(week)) || "[]"
    );

    const alreadyExists = weeklyRecipe.some((recipe) =>
      storedRecipes.some((storedRecipe) => storedRecipe.id === recipe.id)
    );

    if (alreadyExists) {
      alert("Some recipes are already saved for this week.");
      return;
    }

    localStorage.setItem(
      createSlug(week),
      JSON.stringify([...storedRecipes, ...weeklyRecipe])
    );
    alert("Recipe added");
    setWeeklyRecipe([]);
    setIsModalOpen(false);
    setWeek("");
  };

  useEffect(() => {}, []);
  return (
    <Context.Provider
      value={{
        weeklyRecipe,
        handleSetWeeklyRecipe,
        handleWeeklyRecipeSave,
        isModalOpen,
        setIsModalOpen,
        week,
        setWeek,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useClientContext = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error("useClientContext must be used within a ContextProvider");
  }
  return context;
};
