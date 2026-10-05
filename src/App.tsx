import { CustomCursor } from "./components/CustomCursor";
import { Hero } from "./components/Hero";
import { Packs } from "./components/Packs";
import { Process } from "./components/Process";
import { Clients } from "./components/Clients";
import { Team } from "./components/Team";

function App() {
  return (
    <>
      <CustomCursor />
      <Hero />
      <Process />
      <Packs />
      <Clients />
      <Team />
    </>
  );
}

export default App;