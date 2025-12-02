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
          <p className="about-title">What is this ?</p>
          <p className="about-desc">
            "Get JSON" is a simple web-scraping tool which provides JSON data
            from public web-pages, required for your project. Thereby saving
            tons of copy-pasting time.
          </p>
        </div>
        <hr className="about-line" />
        <div id="how-sec">
          <p className="about-title">How does this Work ?</p>
          <ol>
            <li className="about-desc">Add the data source web-page URLs.</li>
            <li className="about-desc">
              Add the CSS Selector of target HTML element which has the required
              data.
            </li>
            <li className="about-desc">
              Click on "Get JSON". This will scrape your required data from all
              URLs and provide you the consolidated JSON output.
            </li>
          </ol>
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
        About
      </span>
    </div>
  );
}
