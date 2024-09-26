import "./App.css";
import Meals from "./components/Meals";
import Container from "./components/shared/Container";
import Heading from "./components/shared/Heading";
import Tab from "./components/Tab";
import Image from "./assets/pizza-background.avif";

function App() {
  return (
    <main className="bg-gradient-to-r from-pink-200/30 via-purple-200/30 to-blue-200/30 min-h-screen">
      <section className="relative z-[1] h-80 after:content-[''] after:absolute after:inset-0 after:bg-white after:opacity-70">
        <div className="relative z-10 text-center space-y-2 flex flex-col justify-center h-full border">
          <Heading className="md:text-5xl text-3xl" tag="h1">
            Optimize Your Meal
          </Heading>
          <p className="text-lg">
            Select Meal to add in Week. You will be to edit. Modify and change
            the Meal Week.
          </p>
        </div>
        <img
          src={Image}
          alt="pizza-background"
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        />
      </section>
      <section>
        <Container>
          <Heading className="text-3xl py-6" tag="h2">
            Week Orders
          </Heading>
        </Container>
        <Tab />
        <Meals />
      </section>
    </main>
  );
}

export default App;
