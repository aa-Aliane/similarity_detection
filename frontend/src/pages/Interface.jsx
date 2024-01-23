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

  const { suspicious, setSuspicious } = useModel();

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
    if (typeof text === "string") {
      mostSimilar(text);
    } else {
      mostSimilar(text);
    }
  };
  return (
    <form
      className="interface"
      onSubmit={HandleSubmit}
      data-opened={menu_toggled}
    >
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
        <>
          <textarea
            className="interface__text textarea"
            placeholder={text.suspicious}
            data-dir={current_lang === "ar"}
            onChange={(e) => setSuspicious(e.target.value)}
          ></textarea>
        </>
      )}
      {/* <button className="btn btn--check interface__upload">
        
        </button> */}
      {fromFile && <p className="interface__text">{suspicious.name}</p>}
      <div className="flex-container">
        <label
          className="btn btn--check interface__upload"
          htmlFor="file-input"
        >
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
          {!isLoading ? (
            <>
              <p>{text.detect}</p>
              <span class="material-symbols-outlined">plagiarism</span>
            </>
          ) : (
            <h4>loading...</h4>
          )}
        </button>
      </div>
    </form>
  );
};

export default Interface;
