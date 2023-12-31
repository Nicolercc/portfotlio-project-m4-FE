import React, { useEffect, useState } from "react";
import { getAllQuotes } from "../Api/Api";
import { useNavigate } from "react-router-dom";

function DisplayAllQuotes() {
  const [allQuotes, setAllQuotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllQuotes();
  }, []);

  async function fetchAllQuotes() {
    try {
      let result = await getAllQuotes();
      const data = result.data;
      setAllQuotes(data);
      console.log(data);
    } catch (e) {
      console.log("Error fetching bookmarks:", e);
    }
  }

  if (!allQuotes.length) {
    return (
      <div className="loader-container">
        <div className="d-flex justify-content-center m-5 loader ">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="">
          <div className="row mx-2">
            {allQuotes.map((quote) => (
              <div className="col-md-4 " key={quote.id}>
                <figure
                  className="text-center bg-white py-5 px-4 shadow-2 rounded card m-5"
                  style={{ borderRadius: "0.75rem" }}
                >
                  <blockquote className="blockquote pb-2">
                    <p>
                      <i
                        className="fas fa-angle-double-left"
                        style={{ color: "#f9a169" }}
                      ></i>
                      <span className="lead font-italic">
                        {quote.quote_text}
                      </span>
                      <i
                        className="fas fa-angle-double-right"
                        style={{ color: "#f9a169" }}
                      ></i>
                    </p>
                  </blockquote>
                  <figcaption className="blockquote-footer mb-0 font-italic">
                    {quote.author}
                  </figcaption>
                  <div className="btn-container">
                    <button
                      className="btn btn-secondary my-3"
                      onClick={() => navigate(`/quotes/${quote.id}`)}
                    >
                      View
                    </button>
                  </div>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayAllQuotes;
