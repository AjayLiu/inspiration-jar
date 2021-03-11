import Browse from "@components/home/Browse";
import { Quote } from "@hooks/quoteTypes";
import useGetQuotes from "@hooks/useGetQuotes";
import { useEffect, useState } from "react";

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
      {
        gotQuotes && quotesList.length > 0 && (
          <Browse
            quotesList={quotesList}
            isUserQuotes={true}
            refetchCallback={refetchQuotes}
          />
        )
        // quotesList.map((q, idx) => {
        //   return <QuoteCard quote={q} key={idx} showIfApproved={true} />;
        // })
      }
    </div>
  );
};

export default YourQuotes;
