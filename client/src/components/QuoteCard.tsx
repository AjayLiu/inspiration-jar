import { Quote } from "@hooks/quoteTypes";
import usePostVote from "@hooks/usePostVotes";
import styles from "@styles/QuoteCard.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  quote: Quote;
  clickHandler?;
  showVoteButton?: boolean;
  voted?: boolean;
  showIfApproved?: boolean;
}

const QuoteCard: React.FC<Props> = (props) => {
  const [isVoted, setIsVoted] = useState(false);
  const [quoteState, setQuoteState] = useState<Quote>({
    quoteID: 0,
    quoteContent: "Loading...",
  });
  useEffect(() => {
    if (props.quote) {
      setQuoteState(props.quote);
      setIsVoted(props.voted);
    }
  }, [props]);

  const [voteCount, setVoteCount] = useState(0);
  useEffect(() => {
    const fetchVoteCount = async () => {
      const response = await fetch(
        "/api/quotes/vote/for/" + quoteState.quoteID
      );
      const data = await response.json();
      setVoteCount(data.count);
    };
    if (quoteState.quoteID != 0) {
      fetchVoteCount();
    }
  }, [quoteState.quoteID]);

  const [voteExecuteTrigger, setVoteExecuteTrigger] = useState(false);
  const fetchPostVote = usePostVote(
    {
      id: quoteState.quoteID,
    },
    voteExecuteTrigger
  );
  const router = useRouter();

  useEffect(() => {
    if (props.showVoteButton) {
      if (fetchPostVote.submissionStatus !== "Waiting") {
        switch (fetchPostVote.submissionStatus) {
          case "Not Logged In":
            router.push("/login");
            break;
          case "Success":
            setIsVoted(true);
            break;
        }
        setVoteExecuteTrigger(false);
      }
    }
  }, [fetchPostVote]);

  const onVoteClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!isVoted) {
      setVoteExecuteTrigger(true);
    }
  };
  return (
    <div>
      <div className={styles.stickynoteContainer} onClick={props.clickHandler}>
        <div className={styles.quoteText}>"{quoteState.quoteContent}"</div>
        {props.showVoteButton && (
          <div>
            <button
              className={styles.voteButton}
              onClick={(e) => onVoteClick(e)}
            >
              {isVoted ? (
                <img src="img/smile.png" alt="pink smiling face" />
              ) : (
                <img
                  src="img/smile-off.svg"
                  alt="black and white smiling face"
                />
              )}
            </button>
          </div>
        )}
        {props.showIfApproved && (
          <div className={styles.approval}>
            This quote
            {quoteState.approved
              ? " has been approved by admin"
              : " is pending approval from admin"}
            .
          </div>
        )}
        <div className={styles.voteCount}>
          {quoteState.voteCount}{" "}
          {quoteState.voteCount == 1 ? " human was " : " humans were "}thankful
          for this quote
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
