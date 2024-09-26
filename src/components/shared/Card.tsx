import { Star, Trash } from "lucide-react";
import { Recipe } from "../lib/types";
import { useClientContext } from "../provider/ContextProvider";
import Heading from "./Heading";
import { cn } from "../lib/utils";

const Card = ({
  recipe,
  cardType = "VIEW",
  onDelete = () => {},
}: {
  recipe: Recipe;
  cardType?: "VIEW" | "EDIT";
  onDelete?: (id: number) => void;
}) => {
  const { handleSetWeeklyRecipe, weeklyRecipe } = useClientContext();
  const isSelectedRecipe = weeklyRecipe.some((item) => item.id === recipe.id);
  console.log(recipe);

  return (
    <div
      className={cn(
        "p-7 rounded-lg bg-white shadow-lg",

        isSelectedRecipe && "ring-2 ring-sky-900"
      )}
      onClick={() => {
        if (cardType === "VIEW") {
          handleSetWeeklyRecipe(recipe);
        }
      }}
    >
      <div className={"w-full h-60 overflow-hidden rounded-lg relative"}>
        <img
          src={recipe.image}
          alt="image"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute top-3 right-3 bg-black text-white text-xs px-2 py-0.5 rounded-sm">
          {recipe.mealType[0]}
        </span>
        {cardType === "EDIT" && (
          <button
            onClick={() => onDelete(recipe.id)}
            className="absolute top-3 left-3 bg-red-500 text-white text-xs p-1 rounded-sm"
          >
            <Trash className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="space-y-3 mt-4">
        <Heading tag="h4" className="text-2xl">
          {recipe.name}
        </Heading>
        <p className="text-sm text-gray-500 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid et
          quasi repellendus facilis, id consequatur pariatur reprehenderit magni
          eos. Harum itaque quaerat mollitia hic quisquam amet iste odit ducimus
          excepturi!
        </p>
        <div className="flex justify-between items-center">
          <p>
            <span className="font-bold">Cuisine:</span> {recipe.cuisine}
          </p>
          <div className="flex items-center gap-x-1">
            <p>
              <span className="font-bold">Rating:</span> {recipe.rating}
            </p>
            {Array.from({ length: Math.floor(recipe.rating) }).map(
              (_, index) => (
                <Star className="w-4 h-4 text-sky-900" key={index} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
