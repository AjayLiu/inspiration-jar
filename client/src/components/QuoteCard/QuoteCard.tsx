import { YourQuotesContext } from "@components/YourQuotes/YourQuotesContext";
import { Quote } from "@hooks/quoteTypes";
import usePostQuotes from "@hooks/usePostQuotes";
import usePostVote from "@hooks/usePostVotes";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "./QuoteCard.module.scss";
interface Props {
  quote: Quote;
  clickHandler?;
  voted?: boolean;
  isUserQuotes?: boolean;
  isAdmin?: boolean;
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
    if (!props.isUserQuotes) {
      if (fetchPostVote.submissionStatus !== "Waiting") {
        console.log(fetchPostVote.submissionStatus);
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

  const [deleteQuoteTrigger, setDeleteVoteTrigger] = useState(false);
  const fetchDeleteQuote = usePostQuotes(
    props.quote == undefined ? "" : "/" + props.quote.quoteID,
    "DELETE",
    {},
    deleteQuoteTrigger
  );

  const onDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
    Swal.fire({
      title: "Are you sure you want to delete this quote forever?",
      showDenyButton: true,
      confirmButtonText: "Yes, delete this quote forever.",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeleteVoteTrigger(true);
      }
    });
  };

  const refetchCallback = useContext(YourQuotesContext);
  useEffect(() => {
    if (fetchDeleteQuote.submissionStatus != "Waiting") {
      switch (fetchDeleteQuote.submissionStatus) {
        case "Success":
          Swal.fire({
            title: "Success",
            text: "Quote successfully deleted",
            icon: "success",
          });
          break;
        case "Failed":
          Swal.fire({
            title: "Error",
            text: "An error occurred trying to delete this quote",
            icon: "error",
          });
          break;
      }
      setDeleteVoteTrigger(false);
      refetchCallback();
    }
  }, [fetchDeleteQuote]);

  const [executeApprove, setExecuteApprove] = useState(false);
  const approveHook = usePostQuotes(
    "/admin/approve",
    "POST",
    { id: quoteState.quoteID },
    executeApprove
  );
  const onApproveClick = (e: React.MouseEvent<HTMLElement>) => {
    setExecuteApprove(true);
  };
  useEffect(() => {
    if (approveHook.submissionStatus != "Waiting") {
      switch (approveHook.submissionStatus) {
        case "Success":
          Swal.fire({
            title: "Success",
            icon: "success",
          });
          break;
        case "Failed":
          Swal.fire({
            title: "Error",
            icon: "error",
          });
          break;
      }
      setExecuteApprove(false);
    }
  }, [approveHook]);

  return (
    <div>
      <div className={styles.stickynoteContainer} onClick={props.clickHandler}>
        <div className={styles.quoteTextContainer}>
          {<div className={styles.quoteText}>"{quoteState.quoteContent}"</div>}
        </div>
        {!props.isUserQuotes && (
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
        {props.isUserQuotes && (
          <div className={styles.approval}>
            {quoteState.approved ? (
              <div className={styles.isApproved}>
                *This quote has been approved by admin.
              </div>
            ) : (
              <div className={styles.isNotApproved}>
                *This quote is pending approval from admin.
              </div>
            )}
          </div>
        )}
        <div className={styles.voteCount}>
          {quoteState.voteCount}
          {quoteState.voteCount == 1 ? " human was " : " humans were "}thankful
          for this quote
        </div>
        {props.isUserQuotes && (
          <div>
            <button
              className={styles.deleteButton}
              onClick={(e) => onDeleteClick(e)}
            >
              Delete
            </button>
          </div>
        )}
        {props.isAdmin && (
          <button onClick={(e) => onApproveClick(e)}>Approve</button>
        )}
      </div>
    </div>
  );
};

export default QuoteCard;
