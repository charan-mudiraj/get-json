import "./AboutCard.css";

export default function AboutCard() {
  const toggleCard = () => {
    const slider = document.getElementById("about");
    slider.classList.toggle("closed");
  };
  return (
    <div id="about">
      <div className="flex-row">
        <div id="what-sec">
          <p className="about-title">What is it ?</p>
          <p className="about-desc">
            "Get JSON" is a simple web-scraping tool which provides JSON data
            from web-pages, required for your project. Thereby saving tons of
            copy-pasting time.
          </p>
        </div>
        <hr className="about-line" />
        <div id="how-sec">
          <p className="about-title">How does it Work ?</p>
          <p className="about-desc">
            The URLs from which the similar(same props) data to be fetched are
            specified in URLs Section. The Classes(whole string) of required
            data's HTML element are specified in classes section, with optional
            other optional settings.
          </p>
        </div>
        <hr className="about-line" />
        <div id="demo-sec">
          <p className="about-title">Need a Demo ?</p>
          <div>
            <a
              id="yt-link"
              href="https://www.youtube.com/watch?v=XYSKLEEvNYc&list=PLgSNzrXIGnTo3etHGDj1KN23acOJbBf4T&index=3"
              target="_blank"
            >
              Watch Demo
            </a>
          </div>
        </div>
      </div>
      <span id="card-tag" onClick={toggleCard}>
        Click Me !
      </span>
    </div>
  );
}
