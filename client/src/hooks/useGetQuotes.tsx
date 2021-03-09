import { Quote } from "@hooks/quoteTypes";
import { useEffect, useState } from "react";

const useGetQuotes = (path: string, execute = true) => {
  const [quotesList, setQuotesList] = useState<Array<Quote>>([]);
  useEffect(() => {
    if (execute) {
      const getVoteCountFor = async (id) => {
        const response = await fetch(`/api/quotes/vote/for/${id}`, {
          method: "GET",
        });
        const data = await response.json();
        return data.count;
      };

      const getQuotes = async () => {
        const response = await fetch(`/api/quotes${path}`, { method: "GET" });
        const data = await response.json();

        const quotes: Array<Quote> = await Promise.all(
          data.map(async (obj) => {
            const voteCount = await getVoteCountFor(obj.quote_id);
            const thisQuote: Quote = {
              quoteID: obj.quote_id,
              quoteContent: obj.quote_content,
              approved: obj.approved,
              voteCount: voteCount,
            };
            return thisQuote;
          })
        );
        setQuotesList(quotes);
      };
      getQuotes();
    }
  }, [execute]);
  return quotesList;
};

export default useGetQuotes;
