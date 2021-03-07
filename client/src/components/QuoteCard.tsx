import { Quote } from "@hooks/quoteTypes";
import usePostVote from "@hooks/usePostVotes";
import styles from "@styles/QuoteCard.module.css";
import { useRouter } from "next/router";
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
  const [voteCount, setVoteCount] = useState(0);
  useEffect(() => {
    if (props.quote) {
      setQuoteText(props.quote.quoteContent);
      setQuoteID(props.quote.quoteID);
      setIsVoted(props.voted);
    }
  }, [props.quote]);

  useEffect(() => {
    const fetchVoteCount = async () => {
      console.log(quoteID);
      const response = await fetch("/api/quotes/vote/for/" + quoteID);
      const data = await response.json();
      console.log(data.count);
    };
    if (quoteID != 0) {
      fetchVoteCount();
    }
  }, [quoteID]);

  const [voteExecuteTrigger, setVoteExecuteTrigger] = useState(false);
  const fetchPostVote = usePostVote(
    {
      id: quoteID,
    },
    voteExecuteTrigger
  );
  const router = useRouter();

  useEffect(() => {
    console.log(fetchPostVote.submissionStatus);
    if (fetchPostVote.submissionStatus !== "Waiting") {
      switch (fetchPostVote.submissionStatus) {
        case "Not Logged In":
          router.push("/login");
          break;
        case "Success":
          break;
      }
      setVoteExecuteTrigger(false);
    }
  }, [fetchPostVote]);

  const onVoteClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!isVoted) {
      setVoteExecuteTrigger(true);
      setIsVoted(true);
    }
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
          <div>{voteCount} humans were thankful for this quote</div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
