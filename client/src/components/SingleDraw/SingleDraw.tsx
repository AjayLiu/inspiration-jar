import FinalQuoteCard from "@components/FinalQuoteCard/FinalQuoteCard";
import QuoteCard from "@components/QuoteCard/QuoteCard";
import { Quote, Vote } from "@hooks/quoteTypes";
import { useEffect, useState } from "react";
import styles from "./SingleDraw.module.scss";
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
        setIsLastQuote(false);
        setVoted(false);
        props.votesList.forEach((obj) => {
          if (obj.quoteID == quotesList[quoteIndex].quoteID) {
            setVoted(true);
            return;
          }
        });
      }
    }
  }, [props, quoteIndex]);

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
      <h2 className={styles.instruction}>Tap the card for more quotes!</h2>
      <h3 className={styles.instructionSmall}>
        Tap the <img src="img/smile-off.svg" alt="smiling face" /> to thank the
        author!
      </h3>
      <div className={styles.row}>
        <div className={styles.mid}>
          {isLastQuote ? (
            <FinalQuoteCard reshuffleCallback={reshuffle} />
          ) : (
            <QuoteCard
              quote={quote}
              clickHandler={() => setQuoteIndex(quoteIndex + 1)}
              voted={voted}
            />
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <div className={styles.button}>
          {quoteIndex != 0 && (
            <button onClick={() => setQuoteIndex(quoteIndex - 1)}>
              <img src="img/arrow-left.png" alt="left arrow" />
            </button>
          )}
        </div>
        <div className={styles.button}>
          {!isLastQuote && (
            <button onClick={() => setQuoteIndex(quoteIndex + 1)}>
              <img src="img/arrow-right.png" alt="left arrow" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleDraw;
