import "./App.css";
import GetJson from "./GetJson";
import AboutCard from "./components/AboutCard";
import SavedCard from "./components/SavedCard";
import SocialIcons from "./components/SocialIcons";

function App() {
  return (
    <div id="app">
      <AboutCard />
      <GetJson />
      <SavedCard />
      <SocialIcons />
    </div>
  );
}

// test

export default App;
