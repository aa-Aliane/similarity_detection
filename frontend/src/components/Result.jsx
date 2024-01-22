import React from "react";
import { useLanguage } from "../store/LanguageState";
import { useDetailsMutation } from "../api/queries/simQueries";
import { useModel } from "../store/ModelState";
import { useNavigate } from "react-router-dom";

const Result = ({ result }) => {
  const { mutate: showDetails } = useDetailsMutation();
  const current_lang = useLanguage((state) => state.current_language);
  const text = useLanguage((state) => state.text.result);
  const { suspicious } = useModel();
  const navigate = useNavigate();

  const HandleDetails = (e, article_id) => {
    e.preventDefault();
    showDetails(article_id, suspicious);
    navigate("/details");
  };
  return (
    <div className="result">
      <div data-rlang={result.lang} className="result__title">
        <a href={result.url} target="_blank">
          {result.title}
        </a>
      </div>
      <div data-dir={current_lang === "ar"} className="result__rate">
        {result.rate}%
      </div>
      <ul data-rlang={result.lang} className="result__authors">
        <li className="result__authors__author">{result.authors}</li>
      </ul>
      <div data-dir={current_lang === "ar"} className="result__deep">
        <button
          className="btn btn--deep"
          onClick={(e) => HandleDetails(e, result.article_id)}
        >
          {text.deep}
        </button>
      </div>
    </div>
  );
};

export default Result;
