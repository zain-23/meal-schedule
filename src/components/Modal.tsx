import { useRef, useState } from "react";
import { useClientContext } from "./provider/ContextProvider";
import Heading from "./shared/Heading";
import { WEEKS } from "./lib/constant";
import { cn, createSlug } from "./lib/utils";

const Modal = () => {
  const [week, setWeek] = useState<string>("");
  const { handleWeeklyRecipeSave, isModalOpen, setIsModalOpen } =
    useClientContext();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutsite = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };
  return (
    isModalOpen && (
      <div
        className="w-full h-screen fixed top-0 left-0 bg-black/50 flex items-center justify-center z-[100] overflow-y-clip"
        onClick={handleClickOutsite}
      >
        <div
          className="p-10 bg-white rounded-lg space-y-8 flex flex-col items-center duration-300 animate-in"
          ref={modalRef}
        >
          <Heading tag="h4" className="text-3xl text-center">
            Select Week
          </Heading>
          <div className="flex gap-x-6">
            {WEEKS.slice(1).map((w) => (
              <button
                className={cn(
                  "text-xl py-2 px-6 rounded-lg",
                  createSlug(w) === week ? "bg-sky-200" : "bg-gray-200"
                )}
                onClick={() => setWeek(createSlug(w))}
              >
                {w}
              </button>
            ))}
          </div>
          <button
            className="text-xl py-2 px-16 bg-sky-900 rounded-lg text-white"
            onClick={() => handleWeeklyRecipeSave(week)}
          >
            Save
          </button>
        </div>
      </div>
    )
  );
};

export default Modal;
