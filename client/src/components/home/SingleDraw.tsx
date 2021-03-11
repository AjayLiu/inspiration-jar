import FinalQuoteCard from "@components/FinalQuoteCard";
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
  const [isLastQuote, setIsLastQuote] = useState(false);
  useEffect(() => {
    if (props.quotesList.length > 0) {
      reshuffle();
    }
  }, [props.quotesList]);
  useEffect(() => {
    if (quotesList.length > 0) {
      //check if out of bounds
      if (quoteIndex >= quotesList.length) {
        setIsLastQuote(true);
      } else {
        setQuote(quotesList[quoteIndex]);
        props.votesList.forEach((obj) => {
          if (obj.quoteID == quotesList[quoteIndex].quoteID) {
            setVoted(true);
            return;
          }
        });
      }
    }
  }, [props, quoteIndex]);

  const onQuoteClick = () => {
    setQuoteIndex(quoteIndex + 1);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const reshuffle = () => {
    setQuoteIndex(0);
    shuffleArray(quotesList);
    setIsLastQuote(false);
  };

  return (
    <>
      {isLastQuote ? (
        <FinalQuoteCard reshuffleCallback={reshuffle} />
      ) : (
        <QuoteCard
          quote={quote}
          clickHandler={() => onQuoteClick()}
          voted={voted}
        />
      )}
    </>
  );
};

export default SingleDraw;
