import { useEffect, useState } from "react";
import SnippetsService from "../services/SnippetsService";

export default function useFilter () {

  const [snippets, setSnippets] = useState(null);

  useEffect(() => {
    let searchQuery = null;

    try {
      searchQuery = window.location.search.split('=')[1];
    } catch (error) { }

    SnippetsService.searchSnippets(searchQuery)
      .then(snips => {
        if (snips) {
          setSnippets(snips);
        }
      });
  }, [window.location.search]);

  return { snippets };
}