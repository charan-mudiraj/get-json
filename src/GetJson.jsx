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
import CheckBox from "./components/CheckBox";

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
      className="input-text url-input"
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
        placeholder={"Selector-" + id}
        id={"class-" + id}
        onInput={updateClass}
        value={cls}
        className="input-text class-input-text"
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
        className="input-text class-input-text"
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
        className="input-text class-input-select"
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
        className="input-text class-input-select"
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
    <>
      {valueTypeName === "innerText" ||
      valueTypeName === "href" ||
      valueTypeName === "src" ? (
        <select
          id={"valueType-" + id}
          value={valueTypeName}
          onInput={updateValueType}
          className="input-text class-input-select"
        >
          <option value="innerText">inner text</option>
          <option value="href">href</option>
          <option value="src">src</option>
          <option value="">custom</option>
        </select>
      ) : (
        <input
          type="text"
          placeholder={"Value-Type-" + id}
          id={"valueType-" + id}
          onInput={updateValueType}
          value={valueTypeName}
          className="input-text class-input-text"
          autoComplete="off"
        />
      )}
    </>
  );
}
const disableButton = (e) => {
  e.target.disabled = true;
  e.target.style.opacity = "0.5";
  e.target.style.pointerEvents = "none";
};
const enableButton = (e) => {
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
  const [globalSettings, setGlobalSettings] = useState({
    url: false,
    id: true,
  });

  const updateUrl = (id) => {
    const newList = [...urlsList];
    const newUrl = document.getElementById("url-" + id).value;
    newList[id - 1] = newUrl.trim("");
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
    newList[id - 1] = newKey.trim("");
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
    const newValueType = document.getElementById("valueType-" + id).value;
    console.log(newValueType);
    newList[id - 1] = newValueType;
    updateValueTypesList(newList);
  };
  const toggleGlobalSetting = (setting) => {
    setGlobalSettings((current) => {
      const currentSettings = { ...current };
      currentSettings[setting] = !currentSettings[setting];
      return currentSettings;
    });
  };

  const awakeServer = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/`, {
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

  useEffect(() => {
    awakeServer();
  }, []);

  useEffect(() => {
    if (isUserAlerted) {
      alert("Backend Server is Up !");
      setIsUserAlerted(false);
    }
  }, [isBackendUp]);

  const getPayload = () => {
    return JSON.stringify({
      urls: urlsList,
      selectors: classesList,
      keys: keysList,
      types: typesList,
      searchTypes: searchTypesList,
      valueTypes: valueTypesList,
      globalSettings: globalSettings,
    });
  };

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

    // Alerting to wait until backend server is up, if urls are more than 5.
    if (!isBackendUp && urlsList.length > 5) {
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
      const backendURL = isBackendUp
        ? import.meta.env.VITE_BACKEND_URL
        : import.meta.env.VITE_ALT_BACKEND_URL;
      const res = await fetch(`${backendURL}/getJSON`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: getPayload(),
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
    enableButton(e);
  };

  function UrlAddButton() {
    // if (urlsList.length > 5) {
    //   alert(
    //     "Fetching data from atmost 5 URLs is advisable to avoid server crashes."
    //   );
    // }
    return (
      <button
        className="add-btn"
        onClick={() => updateUrlsList((list) => [...list, ""])}
      >
        +
      </button>
    );
  }
  function UrlRemoveButtom() {
    return (
      <button
        className="remove-btn"
        onClick={() =>
          updateUrlsList((list) => {
            const currentList = [...list];
            if (currentList.length > 1) {
              currentList.pop();
            } else {
              currentList[0] = "";
            }
            return currentList;
          })
        }
      >
        -
      </button>
    );
  }
  function ClassAddButton() {
    return (
      <button
        className="add-btn"
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
  function ClassRemoveButton() {
    return (
      <button
        className="remove-btn"
        onClick={() => {
          updateClassesList((list) => {
            const currentList = [...list];
            if (currentList.length > 1) {
              currentList.pop();
            } else {
              currentList[0] = "";
            }
            return currentList;
          });
          updateKeysList((list) => {
            const currentList = [...list];
            if (currentList.length > 1) {
              currentList.pop();
            } else {
              currentList[0] = "";
            }
            return currentList;
          });
          updateTypesList((list) => {
            const currentList = [...list];
            if (currentList.length > 1) {
              currentList.pop();
            } else {
              currentList[0] = "string";
            }
            return currentList;
          });
          updateSearchTypesList((list) => {
            const currentList = [...list];
            if (currentList.length > 1) {
              currentList.pop();
            } else {
              currentList[0] = "single";
            }
            return currentList;
          });
          updateValueTypesList((list) => {
            const currentList = [...list];
            if (currentList.length > 1) {
              currentList.pop();
            } else {
              currentList[0] = "innerText";
            }
            return currentList;
          });
        }}
      >
        -
      </button>
    );
  }
  return (
    <div id="get-json">
      <div id="global-settings-div">
        <div>Global Settings</div>
        <div
          className="global-setting"
          onClick={() => toggleGlobalSetting("url")}
        >
          <CheckBox isChecked={globalSettings.url} />
          <div>Include URL</div>
        </div>
        <div
          className="global-setting"
          onClick={() => toggleGlobalSetting("id")}
        >
          <CheckBox isChecked={globalSettings.id} />
          <div>Include Id</div>
        </div>
      </div>

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
        <UrlRemoveButtom />
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
        <ClassRemoveButton />
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
