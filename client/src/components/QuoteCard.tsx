import { Quote } from "@hooks/quoteTypes";
import styles from "@styles/QuoteCard.module.css";
import { useEffect, useState } from "react";

interface Props {
  quote: Quote;
  clickHandler?;
}

const QuoteCard: React.FC<Props> = (props) => {
  const [quoteText, setQuoteText] = useState("Loading...");
  useEffect(() => {
    if (props.quote) {
      setQuoteText(props.quote.quoteContent);
    }
  }, [props.quote]);

  const onVoteClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <div>
      <div className={styles.stickynoteContainer} onClick={props.clickHandler}>
        <div className={styles.quoteText}>{quoteText}</div>
        <div>
          <button className={styles.voteButton} onClick={(e) => onVoteClick(e)}>
            <img src="img/smile.png" alt="black and white smiling face" />
          </button>
          <div>3 humans were thankful for this quote</div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
