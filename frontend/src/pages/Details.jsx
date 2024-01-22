import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const rateIndicator = (value) => {
  let rate = Number(value);
  var result;
  switch (true) {
    case rate >= 0 && rate < 0.4:
      result = "weak";
      break;
    case rate >= 0.4 && rate <= 0.7:
      result = "medium";
      break;
    case rate >= 0.7 && rate < 0.9:
      result = "strong";
      break;
    case rate >= 0.9:
      result = "very-strong";
      break;
    default:
      result = "invalid";
  }

  return result;
};

const Details = () => {
  const { data: details, isLoading, isError } = useQuery("details");

  return (
    <div className="details-container">
      <ul className="details">
        {!isLoading && details
          ? details.map((paragraph, i) => (
              <li
                key={`paragragh-${i}`}
                className="details__item"
                data-rate={rateIndicator(i)}
              >
                <p>{paragraph.text}</p>
                <div className="details__item__info">
                  <div>
                    taux de similarity :
                    <span
                      className="details__rate"
                      data-rate={rateIndicator(paragraph.rate)}
                    >{`
                ${Number(paragraph.rate * 100).toFixed(2)}%`}</span>
                  </div>
                </div>
              </li>
            ))
          : null}
      </ul>
      {isLoading ? <h2>loading...</h2> : null}
    </div>
  );
};

export default Details;
