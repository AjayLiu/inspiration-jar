import { Quote } from "@hooks/quoteTypes";
import { useEffect, useState } from "react";

const useGetQuotes = (path: string, execute = true) => {
  const [quotesList, setQuotesList] = useState<Array<Quote>>([]);
  useEffect(() => {
    if (execute) {
      const getQuotes = async () => {
        const response = await fetch(`/api/quotes${path}`, { method: "GET" });
        const data = await response.json();
        const quotes: Array<Quote> = data.map((obj) => {
          const thisQuote: Quote = {
            quoteID: obj.quote_id,
            quoteContent: obj.quote_content,
            approved: obj.approved,
          };
          return thisQuote;
        });
        setQuotesList(quotes);
      };
      getQuotes();
    }
  }, [execute]);
  return quotesList;
};

export default useGetQuotes;
