// components
import NavBullets from "./components/NavBullets";
import MainHero from "./components/MainHero";
import DarkLightToggleSwitch from "./components/DarkLightToggleSwitch";

const App = (): JSX.Element => {
  return (
    <>
      <MainHero />
      <NavBullets />
      <DarkLightToggleSwitch />
    </>
  );
};

export default App;
