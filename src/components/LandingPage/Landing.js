import React, { useState, useEffect } from "react";
import { getAllQuotes } from "../Api/Api";
import Categories from "../Categories/Categories";

import "./Landing.css";

function Landing() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  async function fetchQuotes() {
    try {
      let result = await getAllQuotes();
      setQuotes(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchQuotes();
  }, []);

  const featuredQuotes = quotes.filter((quote) => quote.is_featured);

  const handleNextClick = () => {
    const nextIndex = (currentQuoteIndex + 1) % quotes.length;
    setCurrentQuoteIndex(nextIndex);
  };

  const handlePrevClick = () => {
    const prevIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
    setCurrentQuoteIndex(prevIndex);
  };
  console.log(featuredQuotes);

  if (!quotes.length) {
    return (
      <div className="loader-container loader">
        <div className="d-flex justify-content-center m-5 ">Loading...</div>
      </div>
    );
  }

  return (
    <section className=" app-container">
      <div className="container-fluid" style={{ marginTop: "10rem" }}>
        <div className="">
          <div className="">
            <div className="col col-xl-9 my-5 mx-auto">
              <div className="card card-size">
                <div className="card-body py-5 ">
                  <div
                    id="carouselDarkVariant"
                    className="carousel slide carousel-dark"
                    data-mdb-ride="carousel"
                  >
                    {featuredQuotes.length > 0 ? (
                      <div className="carousel-indicators mb-0 ">
                        {featuredQuotes.map((quote, index) => (
                          <button
                            key={index}
                            data-mdb-target="#carouselDarkVariant"
                            data-mdb-slide-to={index}
                            className={
                              index === currentQuoteIndex ? "active" : ""
                            }
                            aria-label={`Slide ${index + 1}`}
                          ></button>
                        ))}
                      </div>
                    ) : (
                      <p className="loader">Loading quotes...</p>
                    )}

                    <div className=" carousel-inner pt-2 pb-5 center">
                      {quotes.map((quote, index) => (
                        <div
                          key={index}
                          className={`main-content carousel-item  ${
                            index === currentQuoteIndex ? "active" : ""
                          }`}
                        >
                          <p className="quote-font ">{quote.quote_text}</p>
                          <p className="author-font">{quote.author}</p>
                        </div>
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-mdb-target="#carouselDarkVariant"
                      data-mdb-slide="prev"
                      onClick={handlePrevClick}
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-mdb-target="#carouselDarkVariant"
                      data-mdb-slide="next"
                      onClick={handleNextClick}
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
