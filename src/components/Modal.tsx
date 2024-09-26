import { useEffect, useRef } from "react";
import { useClientContext } from "./provider/ContextProvider";
import Heading from "./shared/Heading";
import { WEEKS } from "./lib/constant";
import { cn, createSlug } from "./lib/utils";

const Modal = () => {
  const { handleWeeklyRecipeSave, isModalOpen, setIsModalOpen, setWeek, week } =
    useClientContext();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutsite = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);
  return (
    isModalOpen && (
      <div
        className="w-full h-screen fixed top-0 left-0 bg-black/50 flex items-center justify-center z-[100] overflow-y-clip px-4"
        onClick={handleClickOutsite}
      >
        <div
          className="p-10 bg-white rounded-lg space-y-8 flex flex-col items-center duration-300 animate-in"
          ref={modalRef}
        >
          <Heading tag="h4" className="md:text-3xl text-2xl text-center">
            Select Week
          </Heading>
          <div className="flex flex-wrap justify-center gap-6">
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
