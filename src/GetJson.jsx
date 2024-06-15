import { useEffect, useState } from "react";
import {
  urls,
  classes,
  keys,
  types,
  searchTypes,
  valueTypes,
} from "./components/atoms";
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
      <hr className="fields-dividing-horizontal-line" />
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
      <hr className="fields-dividing-horizontal-line" />
    </div>
  );
}
function TypeSelectElement({ id, typeName, updateType }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
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
      <hr className="fields-dividing-horizontal-line" />
    </div>
  );
}
function SearchTypeSelectElement({ id, searchTypeName, updateSearchType }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <select
        id={"searchType-" + id}
        value={searchTypeName}
        onInput={updateSearchType}
        className="searchType"
      >
        <option value="single">Single Value</option>
        <option value="multiple">Multiple Values</option>
      </select>
      <hr className="fields-dividing-horizontal-line" />
    </div>
  );
}
function ValueTypeSelectElement({ id, updateValueType, valueTypeName }) {
  return (
    <select
      id={"valueType-" + id}
      value={valueTypeName}
      onInput={updateValueType}
      className="valueType"
    >
      <option value="innerText">Inner Text</option>
      <option value="href">href</option>
      <option value="src">src</option>
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
// const isURLValid = (url) => {
//   const urlPattern = new RegExp(
//     "^(https?:\\/\\/)?" + // Protocol (http or https), followed by '://'
//       "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // Domain name
//       "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
//       "(\\:\\d+)?" + // Optional port number preceded by colon
//       "(\\/[-a-z\\d%_.~+]*)*" + // Path with optional segments separated by slashes
//       "(\\?[;&a-z\\d%_.~+=-]*)?" + // Optional query string starting with '?'
//       "(\\#[-a-z\\d_]*)?$", // Optional fragment identifier starting with '#'
//     "i" // Case-insensitive match
//   );
//   return !!urlPattern.test(url);
// };
export default function GetJson() {
  const [urlsList, updateUrlsList] = useRecoilState(urls);
  const [classesList, updateClassesList] = useRecoilState(classes);
  const [keysList, updateKeysList] = useRecoilState(keys);
  const [typesList, updateTypesList] = useRecoilState(types);
  const [searchTypesList, updateSearchTypesList] = useRecoilState(searchTypes);
  const [valueTypesList, updateValueTypesList] = useRecoilState(valueTypes);
  const [isLoading, setIsLoading] = useState(false);
  const [jsonData, setJsonData] = useState("");
  const [isBackendUp, setIsBackendUp] = useState(false);
  const [isUserAlerted, setIsUserAlerted] = useState(false);

  const updateUrl = (id) => {
    const newList = [...urlsList];
    const newUrl = document.getElementById("url-" + id).value;
    newList[id - 1] = newUrl.trim(" ");
    updateUrlsList(newList);
  };
  const updateClass = (id) => {
    const newList = [...classesList];
    const newClass = document.getElementById("class-" + id).value;
    newList[id - 1] = newClass.trim(" ");
    updateClassesList(newList);
  };
  const updateKey = (id) => {
    const newList = [...keysList];
    const newKey = document.getElementById("key-" + id).value;
    newList[id - 1] = newKey.trim(" ");
    updateKeysList(newList);
  };
  const updateType = (id) => {
    const newList = [...typesList];
    const newType = document.getElementById("type-" + id).value;
    newList[id - 1] = newType;
    updateTypesList(newList);
  };
  const updateSearchType = (id) => {
    const newList = [...searchTypesList];
    const newSearchType = document.getElementById("searchType-" + id).value;
    newList[id - 1] = newSearchType;
    updateSearchTypesList(newList);
  };
  const updateValueType = (id) => {
    const newList = [...valueTypesList];
    const newSearchType = document.getElementById("valueType-" + id).value;
    newList[id - 1] = newSearchType;
    updateValueTypesList(newList);
  };

  useEffect(() => {
    // awake the server
    const awake = async () => {
      const res = await fetch(`${BACKEND_URL}/`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      const status = data.status;
      if (status == 200) {
        setIsBackendUp(true);
      }
    };
    awake();
  }, []);
  useEffect(() => {
    if (isUserAlerted) {
      alert("Backend Server is Up !");
      setIsUserAlerted(false);
    }
  }, [isBackendUp]);

  const getJSON = async (e) => {
    // URLs Validation
    // let areURLsValid = true;
    // for (const url of urlsList) {
    //   if (url && !isURLValid(url)) {
    //     alert(
    //       '"' + url + '"' + " is not a valid URL.\nPlease check and try again."
    //     );
    //     isValidURLs = false;
    //     break;
    //   }
    // }
    // if (!areURLsValid) {
    //   return;
    // }

    // keys Validation (no spaces in b/w)
    let areKeysValid = true;
    for (const key of keysList) {
      if (/\s/.test(key)) {
        alert(
          "INVALID KEY FORMAT => " +
            '"' +
            key +
            '"' +
            "\nKeys cannot contain spaces."
        );
        areKeysValid = false;
        break;
      }
    }
    if (!areKeysValid) {
      return;
    }

    // Alerting to wait until backend server is up
    if (!isBackendUp) {
      setIsUserAlerted(true);
      alert(
        "Backend Server hasn't started yet. Feel Free to add more URLs in the meantime.\nYou will be alerted when the Backend is Up."
      );
      return;
    }

    // Send Request and GET JSON !
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
          searchTypes: searchTypesList,
          valueTypes: valueTypesList,
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
        id="url-add-btn"
        onClick={() => updateUrlsList((list) => [...list, ""])}
      >
        +
      </button>
    );
  }
  function ClassAddButton() {
    return (
      <button
        id="class-add-btn"
        onClick={() => {
          updateClassesList((list) => [...list, ""]);
          updateKeysList((list) => [...list, ""]);
          updateTypesList((list) => [...list, "string"]);
          updateSearchTypesList((list) => [...list, "single"]);
          updateValueTypesList((list) => [...list, "innerText"]);
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
      <hr className="url-classes-line" />
      <div id="classes-grid">
        <ClassAddButton />
        <div id="cktsv-div">
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
              <TypeSelectElement
                key={i}
                id={i + 1}
                typeName={type}
                updateType={() => updateType(i + 1)}
              />
            ))}
          </div>
          <div id="searchTypes-div">
            {searchTypesList.map((searchType, i) => (
              <SearchTypeSelectElement
                key={i}
                id={i + 1}
                searchTypeName={searchType}
                updateSearchType={() => updateSearchType(i + 1)}
              />
            ))}
          </div>
          <div id="valueTypes-div">
            {valueTypesList.map((valueType, i) => (
              <ValueTypeSelectElement
                key={i}
                id={i + 1}
                valueTypeName={valueType}
                updateValueType={() => updateValueType(i + 1)}
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
