import React, { memo } from "react";
import { Repository } from "./Repository";

/*
  o memo engloba o componente e previne que ele seja alterado apenas
  pela re-renderização do componente pai.
*/

export const RepositoryList = memo(({ getRepositories }) => {
  const [items, setItems] = React.useState([]);
  const [query, setquery] = React.useState("facebook");

  React.useEffect(() => {
    getRepositories(query)
      .then((res) => res.json())
      .then((data) => setItems((data && data.items) || []));
  }, [getRepositories, query]);

  return (
    <div className="list">
      <button
        className="float-btn-rocket"
        onClick={() => setquery("rocketseat")}
      >
        🚀
      </button>
      <br />
      {items &&
        items.map((result) => <Repository key={result.id} {...result} />)}
    </div>
  );
});
