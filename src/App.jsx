import "./App.css";
import GetJson from "./GetJson";
import AboutCard from "./components/AboutCard";
import SocialIcons from "./components/SocialIcons";

function App() {
  return (
    <div id="app">
      <AboutCard />
      <GetJson />
      <SocialIcons />
    </div>
  );
}

export default App;
