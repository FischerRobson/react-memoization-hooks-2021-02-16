import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HeadCounter } from "./Components/Counter";
import { FabButton } from "./Components/FabButton";
import Navbar from "./Components/Navbar";
import { RepositoryList } from "./Components/RepositortList";
import { likesCounter } from "./Services/expensiveCalculation";

const SEARCH = "https://api.github.com/search/repositories";

function App() {
  const [totalLikes, setTotalLikes] = useState(0);
  const [dark, setDark] = useState(false);

  /*
    Por se tratar de uma função muito pesada, sempre que houver
    qualquer renderização do componete, a função será recalculada,
    por exemplo, ao alterar o tema será apresentado delay:

    const likes = likesCounter(totalLikes);

    o useMemo (memorize) verifica se o valor na memória foi alterado, somente
    caso tenha sido ele irá calcular novamente a função.
  */

  const likes = useMemo(() => likesCounter(totalLikes), [totalLikes]);

  /*
    A cada render a função é recalculada:

    const getRepositories = () => fetch(`${SEARCH}?q=facebook`);

    ou seja, a cada alteração de estado, ele fará o fetch

  */

  const getRepositories = useCallback((query) => {
    return fetch(`${SEARCH}?q=${query}`);
  }, []);

  const theme = useMemo(() => ({
    color: dark ? "#fff" : "#333",
    navbar: dark ? "#1a202c" : "#e5e7eb",
    backgroundColor: dark ? "#333" : "#fff",
  }), [dark]);

  const toogleDarkmode = () => setDark(!dark);

  /*
    Sem utilizar o useMemo no theme, o console.log do useEffect é disparado
    todas as vezes, pois o theme é alterado em todas as renderizações.
  */

  useEffect(() => {
    console.log('')
  }, [theme]);

  return (
    <div style={theme} className="App">
      <Navbar theme={theme.navbar} toogleDarkmode={toogleDarkmode} />
      <HeadCounter likes={likes} />
      <RepositoryList getRepositories={getRepositories} />
      <FabButton totalLikes={totalLikes} setTotalLikes={setTotalLikes} />
    </div>
  );
}

export default App;
