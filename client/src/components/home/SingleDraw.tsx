import QuoteCard from "@components/QuoteCard";
import { Quote, Vote } from "@hooks/quoteTypes";
import { useEffect, useState } from "react";

interface Props {
  quotesList: Array<Quote>;
  votesList: Array<Vote>;
}

const SingleDraw: React.FC<Props> = (props) => {
  const quotesList = props.quotesList;
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quote, setQuote] = useState<Quote>();
  const [voted, setVoted] = useState(false);
  useEffect(() => {
    if (quotesList.length > 0) {
      setQuote(quotesList[quoteIndex]);
      props.votesList.forEach((obj) => {
        if (obj.quoteID == quotesList[quoteIndex].quoteID) {
          setVoted(true);
          return;
        }
      });
    }
  }, [props, quoteIndex]);

  const onQuoteClick = () => {
    setQuoteIndex(quoteIndex + 1);
  };

  return (
    <QuoteCard
      quote={quote}
      clickHandler={() => onQuoteClick()}
      voted={voted}
      showVoteButton={true}
    />
  );
};

export default SingleDraw;
