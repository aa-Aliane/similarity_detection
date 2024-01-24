import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Pagination, PaginationInfo } from "../components/Pagination";
import Result from "../components/Result";
import { useModel } from "../store/ModelState";
import { usePagination } from "../store/PaginationState";
import { useToggleMenu } from "../store/General";
import { useLanguage } from "../store/LanguageState";

const Results = () => {
  const current_page = usePagination((state) => state.current_page);
  const results_per_page = usePagination((state) => state.results_per_page);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  const text = useLanguage((state) => state.text.results);

  const menu_toggled = useToggleMenu((state) => state.toggle);

  const { data: results, isLoading, isError } = useQuery("docs");
  useEffect(() => {
    if (results) {
      setStart(current_page * results_per_page - results_per_page);
      setEnd(Math.min(current_page * results_per_page, results.length));
    }
  }, [, current_page, results_per_page]);

  return (
    <div className="results__container" data-opened={menu_toggled}>
      <PaginationInfo nb_results={results ? results.length : 0} />
      <ul className="results">
        {results && results.length !== 0 ? (
          results.slice(start, end).map((r) => (
            <li>
              <Result result={r} />
            </li>
          ))
        ) : (
          <h3 className="centered">{text.no}</h3>
        )}
      </ul>
      <Pagination />
    </div>
  );
};

export default Results;
