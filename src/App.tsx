// components
import NavBar from "./components/NavBar";
import MainHero from "./components/MainHero";
import DarkLightToggleSwitch from "./components/DarkLightToggleSwitch";

const App = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <MainHero />
      <DarkLightToggleSwitch />
    </>
  );
};

export default App;
