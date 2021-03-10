import QuoteCard from "@components/QuoteCard";
import { Quote, Vote } from "@hooks/quoteTypes";
import styles from "@styles/SingleDraw.module.css";
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

  return (
    <>
      {isLastQuote ? (
        <div className={styles.lastQuoteCard}>That was all the quotes!</div>
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
