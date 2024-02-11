import { useEffect, useState } from "react";
import { urls, classes, keys, types } from "./components/atoms";
import { useRecoilState } from "recoil";
import "./GetJson.css";

import JsonLoader from "./components/Loader";
import jsonFormatHighlight from "json-format-highlight";
import CopyButton from "./components/CopyButton";

const customColorOptions = {
  keyColor: "white",
  numberColor: "#ffff00cb",
  stringColor: "lightcoral",
  trueColor: "lightseagreen",
  falseColor: "#f66578",
  nullColor: "cornflowerblue",
};

function UrlElement({ id, updateUrl, url }) {
  return (
    <input
      type="url"
      placeholder={"URL-" + id}
      id={"url-" + id}
      onInput={updateUrl}
      value={url}
      className="url"
      autoComplete="off"
      spellCheck="false"
    />
  );
}
function ClassElement({ id, updateClass, cls }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="text"
        placeholder={"Class-" + id}
        id={"class-" + id}
        onInput={updateClass}
        value={cls}
        className="class"
        autoComplete="off"
        spellCheck="false"
      />
      <hr className="ckt-line" />
    </div>
  );
}
function KeyElement({ id, updateKey, keyName }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="text"
        placeholder={"Key-" + id}
        id={"key-" + id}
        onInput={updateKey}
        value={keyName}
        className="key"
        autoComplete="off"
      />
      <hr className="ckt-line" />
    </div>
  );
}
function SelectElement({ id, typeName, updateType }) {
  return (
    <select
      id={"type-" + id}
      value={typeName}
      onInput={updateType}
      className="type"
    >
      <option value="string">String</option>
      <option value="number">Number</option>
      <option value="boolean">Boolean</option>
    </select>
  );
}
const disableButton = (e) => {
  e.target.disabled = true;
  e.target.style.opacity = "0.5";
  e.target.style.pointerEvents = "none";
};
const enableButtun = (e) => {
  e.target.disabled = false;
  e.target.style.opacity = "1"; // full
  e.target.style.pointerEvents = "auto";
};
export default function GetJson() {
  const [urlsList, updateUrlsList] = useRecoilState(urls);
  const [classesList, updateClassesList] = useRecoilState(classes);
  const [keysList, updateKeysList] = useRecoilState(keys);
  const [typesList, updateTypesList] = useRecoilState(types);
  const [isLoading, setIsLoading] = useState(false);
  const [jsonData, setJsonData] = useState("");

  const updateUrl = (id) => {
    const newList = [...urlsList];
    const newUrl = document.getElementById("url-" + id).value;
    newList[id - 1] = newUrl;
    updateUrlsList(newList);
  };
  const updateClass = (id) => {
    const newList = [...classesList];
    const newClass = document.getElementById("class-" + id).value;
    newList[id - 1] = newClass;
    updateClassesList(newList);
  };
  const updateKey = (id) => {
    const newList = [...keysList];
    const newKey = document.getElementById("key-" + id).value;
    newList[id - 1] = newKey;
    updateKeysList(newList);
  };
  const updateType = (id) => {
    const newList = [...typesList];
    const newType = document.getElementById("type-" + id).value;
    newList[id - 1] = newType;
    updateTypesList(newList);
  };
  useEffect(() => {
    // awake the server
    fetch(`${BACKEND_URL}/`);
  }, []);
  const getJSON = async (e) => {
    try {
      disableButton(e);
      setIsLoading(true);
      const res = await fetch(`${BACKEND_URL}/getJSON`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urls: urlsList,
          classes: classesList,
          keys: keysList,
          types: typesList,
        }),
      });
      const data = await res.json();
      setJsonData(JSON.stringify(data));
      const formatted = jsonFormatHighlight(data, customColorOptions);

      const jsonDiv = document.getElementById("jsonDiv");
      const jsonDataDiv = document.getElementById("jsonData");
      jsonDataDiv.innerHTML = "<pre>\n" + formatted + "\n</pre>";
      jsonDiv.hidden = false;
    } catch (e) {
      alert("Couldn't Connect to Backend.");
    }
    setIsLoading(false);
    enableButtun(e);
  };
  function UrlAddButton() {
    // if (urlsList.length > 5) {
    //   alert(
    //     "Fetching data from atmost 5 URLs is advisible to avoid server crashes."
    //   );
    // }
    return (
      <button
        id="url-add"
        onClick={() => updateUrlsList((list) => [...list, ""])}
      >
        +
      </button>
    );
  }
  function ClassKeyTypeAddButton() {
    return (
      <button
        id="class-key-type-add"
        onClick={() => {
          updateClassesList((list) => [...list, ""]);
          updateKeysList((list) => [...list, ""]);
          updateTypesList((list) => [...list, "string"]);
        }}
      >
        +
      </button>
    );
  }
  return (
    <div id="get-json">
      <div id="url-grid">
        <UrlAddButton />
        <div id="urls-div">
          {urlsList.map((url, i) => (
            <UrlElement
              key={i}
              id={i + 1}
              updateUrl={() => updateUrl(i + 1)}
              url={url}
            />
          ))}
        </div>
      </div>
      <hr className="url-crt-line" />
      <div id="class-key-type-grid">
        <ClassKeyTypeAddButton />
        <div id="ckt-div">
          <div id="classes-div">
            {classesList.map((cls, i) => (
              <ClassElement
                key={i}
                id={i + 1}
                updateClass={() => updateClass(i + 1)}
                cls={cls}
              />
            ))}
          </div>
          <div id="keys-div">
            {keysList.map((keyName, i) => (
              <KeyElement
                key={i}
                id={i + 1}
                updateKey={() => updateKey(i + 1)}
                keyName={keyName}
              />
            ))}
          </div>
          <div id="types-div">
            {typesList.map((type, i) => (
              <SelectElement
                key={i}
                id={i + 1}
                typeName={type}
                updateType={() => updateType(i + 1)}
              />
            ))}
          </div>
        </div>
      </div>

      <button id="get-btn" onClick={getJSON}>
        Get JSON
      </button>
      {isLoading ? <JsonLoader /> : null}
      <div id="jsonDiv" hidden>
        <div id="copy-btn">
          <CopyButton jsonData={jsonData} />
        </div>
        <div id="jsonData"></div>
      </div>
    </div>
  );
}
