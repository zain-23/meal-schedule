import { useSearchParams } from "react-router-dom";
import AllMeals from "./AllMeal";
import Container from "./shared/Container";
import WeeklyMeal from "./WeeklyMeal";

const Meals = () => {
  const [searchParams] = useSearchParams();

  const week = searchParams.get("week")
    ? searchParams.get("week")
    : "all-meals";
  return (
    <Container>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-10 lg:gap-8 md:gap-6 gap-4 py-14">
        {week === "all-meals" ? <AllMeals /> : <WeeklyMeal week={week!} />}
      </div>
    </Container>
  );
};

export default Meals;
