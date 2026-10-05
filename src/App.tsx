import { CustomCursor } from "./components/CustomCursor";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { Packs } from "./components/Packs";
import { Process } from "./components/Process";
import { Clients } from "./components/Clients";
import { Team } from "./components/Team";
import { Technologies } from "./components/Technologies";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { SectionDivider } from "./components/SectionDivider";

function App() {
  return (
    <>
      <CustomCursor />
      <Hero />
      <Intro />
      <Technologies />
      <Process />
      <Packs />
      <Clients />
      <Team />
      <FAQ />
      <Contact />
    </>
  );
}

export default App;