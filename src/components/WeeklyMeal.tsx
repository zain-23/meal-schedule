import Heading from "./shared/Heading";
import { Recipe } from "./lib/types";
import Card from "./shared/Card";
import { useEffect, useState } from "react";

const WeeklyMeal = ({ week }: { week: string }) => {
  const [recipes, setRecipes] = useState<Recipe[] | []>([]);
  console.log(week, "week");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(week) || "[]");
    setRecipes(data);
  }, [week]);

  if (!recipes || recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center col-span-12 gap-y-4">
        <Heading tag="h4" className="text-5xl">
          Opps!
        </Heading>
        <p>No Recipe in this week</p>
      </div>
    );
  }

  const deleteRecipe = (id: number) => {
    const filterRecipe = recipes.filter((r) => r.id !== id);
    localStorage.setItem(week, JSON.stringify(filterRecipe));
    setRecipes(filterRecipe);
  };
  return recipes.map((recipe) => (
    <Card
      key={recipe.id}
      recipe={recipe}
      cardType="EDIT"
      onDelete={deleteRecipe}
    />
  ));
};

export default WeeklyMeal;
