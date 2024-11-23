import React, { useEffect, useRef, useState } from "react";
import "./SavedCard.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { classes, keys, searchTypes, types, urls, valueTypes } from "./atoms";

const getSavedInputs = () => {
  const saved = window.localStorage.getItem("saved-inputs");
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
};

const saveInputs = (inputs) => {
  window.localStorage.setItem("saved-inputs", inputs);
};

const savedInputs = getSavedInputs();

export default function SavedCard() {
  const [saved, setSaved] = useState(savedInputs);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urlsList, updateUrlsList] = useRecoilState(urls);
  const [classesList, updateClassesList] = useRecoilState(classes);
  const [keysList, updateKeysList] = useRecoilState(keys);
  const [typesList, updateTypesList] = useRecoilState(types);
  const [searchTypesList, updateSearchTypesList] = useRecoilState(searchTypes);
  const [valueTypesList, updateValueTypesList] = useRecoilState(valueTypes);
  const sidebarRef = useRef(null);

  const toggleCard = () => {
    const slider = document.getElementById("saved");
    slider.classList.toggle("closed");
  };

  const closeCard = () => {
    const slider = document.getElementById("saved");
    slider.classList.remove("closed");
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      closeCard();
    }
  };

  const onAdd = () => {
    if (!title.trim()) {
      alert("Title is mandatory.");
      return;
    }
    const data = {
      urls: urlsList,
      classes: classesList,
      keys: keysList,
      types: typesList,
      searchTypes: searchTypesList,
      valueTypes: valueTypesList,
    };

    const input = {
      id: new Date(),
      title: title.trim(),
      description: description.trim(),
      data,
    };
    saveInputs(JSON.stringify([input, ...saved]));
    setSaved((prev) => [input, ...saved]);
    setTitle("");
    setDescription("");
  };

  const onDelete = (item) => {
    const isConfirmed = confirm(
      `Are you sure you want to delete this ?\n-> Title: ${item.title}\n${
        item.description !== "" ? `-> Description: ${item.description}\n` : ""
      }-> Urls: ${item.data.urls.length}\n-> Classes: ${
        item.data.classes.length
      }`
    );
    if (!isConfirmed) return;
    const savedItemIndex = saved.findIndex((it) => it.id == item.id);
    if (savedItemIndex !== -1) {
      setSaved((prev) => {
        const curr = [...prev];
        curr.splice(savedItemIndex, 1);
        saveInputs(curr);
        return curr;
      });
    }
  };

  const onImport = (item) => {
    const isConfirmed = confirm(
      `All the existing inputs will be replaced the inputs in \`${item.title}\`.\nAre you sure about this ?`
    );
    if (!isConfirmed) return;
    updateUrlsList(item.data.urls);
    updateClassesList(item.data.classes);
    updateKeysList(item.data.keys);
    updateTypesList(item.data.types);
    updateSearchTypesList(item.data.searchTypes);
    updateValueTypesList(item.data.valueTypes);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div id="saved" ref={sidebarRef}>
      <span id="saved-card-tag" onClick={toggleCard}>
        Saved
      </span>
      <div className="saved-flex-row">
        <p className="saved-title">
          Save inputs for pre-filling them back anytime
        </p>
        <div>
          <div
            className="saved-cards"
            style={{
              paddingInline: "15px",
            }}
          >
            <div
              style={{
                padding: "7px 12px 18px 28px",
              }}
            >
              <input
                className="saved-input-text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  color: "#29dbbc",
                }}
              />
              <input
                className="saved-input-text"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button className="saved-btn" onClick={onAdd}>
                Add
              </button>
            </div>
          </div>
          <div
            style={{
              height: "15px",
            }}
          />
          {saved.length > 0 && (
            <>
              <hr className="saved-line" />
              <div id="saved-cards-scroller">
                <div
                  className="saved-cards"
                  style={{
                    paddingBlock: "15px",
                    paddingLeft: "15px",
                  }}
                >
                  {saved.map((item, i, arr) => (
                    <>
                      <div
                        key={i}
                        style={{
                          textAlign: "start",
                          alignItems: "start",
                          padding: "5px 10px 15px 10px",
                          gap: "5px",
                          maxWidth: "272px",
                          overflow: "hidden",
                        }}
                      >
                        <span
                          style={{
                            color: "#29dbbc",
                            fontSize: "17px",
                            fontWeight: "bold",
                            letterSpacing: "1.5px",
                          }}
                        >
                          {item.title}
                        </span>
                        {item.description && (
                          <span
                            style={{
                              fontSize: "14px",
                              letterSpacing: "1.5px",
                            }}
                          >
                            {item.description}
                          </span>
                        )}
                        <div
                          style={{
                            opacity: "0.5",
                            fontSize: "13px",
                            letterSpacing: "2px",
                          }}
                        >
                          <span>Urls: {item.data.urls.length}</span>
                          &nbsp;
                          <span
                            style={{
                              opacity: "0.5",
                            }}
                          >
                            |
                          </span>
                          &nbsp;
                          <span>Classes: {item.data.classes.length}</span>
                        </div>

                        <span
                          style={{
                            display: "flex",
                            gap: "15px",
                            width: "fit-content",
                            justifyContent: "end",
                            width: "100%",
                          }}
                        >
                          <button
                            className="saved-btn"
                            onClick={() => onImport(item)}
                          >
                            Import
                          </button>
                          <button
                            className="saved-btn"
                            onClick={() => onDelete(item)}
                          >
                            Delete
                          </button>
                        </span>
                      </div>
                    </>
                  ))}
                </div>
              </div>{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
