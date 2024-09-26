import { useEffect, useState } from "react";
import { Recipe } from "./lib/types";
import { getRecipes } from "./lib/utils";
import Card from "./shared/Card";

const AllMeals = () => {
  const [recipes, setRecipes] = useState<Recipe[] | []>([]);
  useEffect(() => {
    const fetchRecipe = async () => {
      const recipes = await getRecipes();
      setRecipes(recipes.recipes);
    };
    fetchRecipe();
  }, []);
  return recipes.map((recipe) => <Card key={recipe.id} recipe={recipe} />);
};

export default AllMeals;
