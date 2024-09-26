import { useClientContext } from "./provider/ContextProvider";
import Container from "./shared/Container";
import { WEEKS } from "./lib/constant";
import { cn, createSlug } from "./lib/utils";
import Modal from "./Modal";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Tab = () => {
  const { setIsModalOpen, weeklyRecipe } = useClientContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pathname = useLocation();

  const searchWeek = searchParams.get("week")
    ? searchParams.get("week")
    : "all-meals";

  const handleClick = (week: string) => {
    const params = new URLSearchParams(searchParams);
    if (week) {
      params.set("week", week);
    } else {
      params.delete(week);
    }
    navigate(`${pathname.pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-white py-6 md:py-10 sticky top-0 z-50">
      <Container>
        <div className="flex flex-wrap justify-between items-center">
          <div className="md:flex hidden flex-wrap justify-center items-center gap-2 md:gap-x-4">
            {WEEKS.map((week) => (
              <button
                key={week}
                className={cn(
                  "font-semibold text-base md:text-lg px-4 xl:px-14 pb-2 md:pb-4 relative ",
                  searchWeek === createSlug(week) &&
                    "after:content-[''] after:h-[3px] md:after:h-[5px] after:w-full after:absolute after:bottom-0 after:left-0 after:bg-sky-900 text-sky-900"
                )}
                onClick={() => handleClick(createSlug(week))}
              >
                {week}
              </button>
            ))}
          </div>
          <select
            name="week"
            id=""
            className="md:hidden w-full h-12 px-2 border relative"
            defaultValue={searchWeek!}
            onChange={(e) => {
              handleClick(e.target.value);
            }}
          >
            {WEEKS.map((w) => (
              <option value={createSlug(w)}>{w}</option>
            ))}
          </select>
          <button
            onClick={() => setIsModalOpen(true)}
            className={cn(
              "mt-4 md:mt-0 py-2 px-4 md:px-6 bg-sky-900 text-white text-base md:text-lg font-semibold rounded-md disabled:opacity-50"
            )}
            disabled={weeklyRecipe.length === 0}
          >
            Add to Week
          </button>
        </div>
      </Container>
      <Modal />
    </div>
  );
};

export default Tab;
