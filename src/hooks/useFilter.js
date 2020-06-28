import { useEffect, useState } from "react";
import AirSnippets from "../services/AirSnippets";

export default function useFilter () {

  const [snippets, setSnippets] = useState(null);

  useEffect(() => {
    let searchQuery = null;

    try {
      searchQuery = window.location.search.split('=')[1];

      AirSnippets.searchSnippets(searchQuery)
        .then(snips => {
          if (snips) {
            setSnippets(snips);
          }
        });

    } catch (error) { }
  }, [window.location.search]);

  return { snippets };
}