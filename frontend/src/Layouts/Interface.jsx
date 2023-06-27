import React, { useState } from "react";
import { useLanguage } from "../store/LanguageState";
import { api, api_form } from "../api/api";
import { useLayout } from "../store/LayoutState";
import { useModel } from "../store/ModelState";
import { useToggleMenu } from "../store/General";
import { useMostSimilarMutation } from "../api/queries/simQueries";

const Interface = () => {
  const text = useLanguage((state) => state.text.interface);
  // const set_current_layout = useLayout((state) => state.set_current_layout);
  const current_lang = useLanguage((state) => state.current_language);
  const [fromFile, setFromFile] = useState(false);

  const [suspicious, setSuspicious] = useState("");

  const {
    mutate: mostSimilar,
    data: results,
    isLoading,
    isError,
  } = useMostSimilarMutation();

  const menu_toggled = useToggleMenu((state) => state.toggle);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    set_suspicious(uploadedFile);
    setFromFile(true);
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    HandlePlagiarismDetection(suspicious);
  };

  // Handle plagiarism detection
  const HandlePlagiarismDetection = (text) => {
    console.log(text);
    if (typeof text === "string") {
      api.get(`most_similar/?text=${text}`).then((res) => {
        console.log("🚀 ~ file: Interface.jsx:22 ~ .then ~ res:", res);
        mostSimilar(text);
      });
    } else {
      let data = new FormData();
      data.append("file", text);
      data.append("k", 100);
      api_form.post("most_similar_file/", data).then((res) => {
        console.log("🚀 ~ file: Interface.jsx:22 ~ .then ~ res:", res);
        setSuspicious(text);
        set_results(res.data.response);
        // set_current_layout("results");
      });
    }
  };
  return (
    <form
      className="interface"
      onSubmit={HandleSubmit}
      data-opened={menu_toggled}
    >
      <h1>{results && results.length}</h1>
      <button
        data-display={fromFile}
        data-dir={current_lang === "ar"}
        className="interface__cancel btn btn--cancel"
        onClick={() => {
          setSuspicious("");
          setFromFile(false);
        }}
      >
        <span class="material-symbols-outlined">backspace</span>
      </button>
      {!fromFile && (
        <textarea
          className="interface__text textarea"
          placeholder={text.suspicious}
          onChange={(e) => setSuspicious(e.target.value)}
        ></textarea>
      )}
      {/* <button className="btn btn--check interface__upload">
        
        </button> */}
      {fromFile && <p className="interface__text">{suspicious.name}</p>}
      <label className="btn btn--check interface__upload" htmlFor="file-input">
        <p>{text.upload}</p>
        <span class="material-symbols-outlined">picture_as_pdf</span>
      </label>
      <input
        className="interface__upload"
        id="file-input"
        type="file"
        onChange={handleFileUpload}
      />
      <button
        data-enabled={suspicious !== ""}
        className="btn btn--check interface__check"
        type="submit"
      >
        <p>{text.detect}</p>
        <span class="material-symbols-outlined">plagiarism</span>
      </button>
    </form>
  );
};

export default Interface;
