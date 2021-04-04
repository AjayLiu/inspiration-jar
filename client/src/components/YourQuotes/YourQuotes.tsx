import Browse from "@components/Browse/Browse";
import { Quote } from "@hooks/quoteTypes";
import useGetQuotes from "@hooks/useGetQuotes";
import { useEffect, useState } from "react";
import { YourQuotesContext } from "./YourQuotesContext";

interface Props {
  email: string;
}

const YourQuotes: React.FC<Props> = (props) => {
  const [gotQuotes, setGotQuotes] = useState(false);
  const [executeGetQuotes, setExecuteGetQuotes] = useState(true);
  const userQuotes = useGetQuotes("/from", executeGetQuotes);
  const [quotesList, setQuotesList] = useState<Array<Quote>>();
  useEffect(() => {
    if (userQuotes) {
      setQuotesList(userQuotes);
      setGotQuotes(true);
      setExecuteGetQuotes(false);
    }
  }, [userQuotes]);

  const refetchQuotes = () => {
    setExecuteGetQuotes(true);
  };

  return (
    <div>
      <h2>Your Quotes: {gotQuotes ? quotesList.length : 0}</h2>
      <YourQuotesContext.Provider value={refetchQuotes}>
        {gotQuotes && quotesList.length > 0 && (
          <Browse quotesList={quotesList} isUserQuotes={true} />
        )}
      </YourQuotesContext.Provider>
    </div>
  );
};

export default YourQuotes;
