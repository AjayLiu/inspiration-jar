import { Quote } from "@hooks/quoteTypes";
import usePostVote from "@hooks/usePostVotes";
import styles from "@styles/QuoteCard.module.css";
import { useEffect, useState } from "react";

interface Props {
  quote: Quote;
  clickHandler?;
  voted?: boolean;
}

const QuoteCard: React.FC<Props> = (props) => {
  const [quoteText, setQuoteText] = useState("Loading...");
  const [quoteID, setQuoteID] = useState(0);
  const [isVoted, setIsVoted] = useState(false);
  useEffect(() => {
    if (props.quote) {
      setQuoteText(props.quote.quoteContent);
      setQuoteID(props.quote.quoteID);
      setIsVoted(props.voted);
    }
  }, [props.quote]);

  const [voteExecuteTrigger, setVoteExecuteTrigger] = useState(false);
  const sendVote = usePostVote(
    {
      id: quoteID,
    },
    voteExecuteTrigger
  );

  useEffect(() => {
    if (sendVote.submissionStatus !== "Waiting") {
      if (sendVote.submissionStatus === "Success") {
      } else {
      }
      setVoteExecuteTrigger(false);
    }
  }, [sendVote]);

  const onVoteClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setVoteExecuteTrigger(true);
    setIsVoted(true);
  };

  return (
    <div>
      <div className={styles.stickynoteContainer} onClick={props.clickHandler}>
        <div className={styles.quoteText}>{quoteText}</div>
        <div>
          <button className={styles.voteButton} onClick={(e) => onVoteClick(e)}>
            {isVoted ? (
              <img src="img/smile.png" alt="pink smiling face" />
            ) : (
              <img src="img/smile-off.svg" alt="black and white smiling face" />
            )}
          </button>
          <div>3 humans were thankful for this quote</div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
