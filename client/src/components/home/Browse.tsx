import QuoteCard from "@components/QuoteCard";
import { Quote, Vote } from "@hooks/quoteTypes";
import { useEffect, useState } from "react";

interface Props {
  quotesList: Array<Quote>;
  votesList: Array<Vote>;
}

const Browse: React.FC<Props> = (props) => {
  const quotesList = props.quotesList;

  return (
    <div>
      <h2>Browse</h2>
      {quotesList.map((item, idx) => {
        let voted = false;
        props.votesList.forEach((obj) => {
          if (obj.quoteID == item.quoteID) {
            voted = true;
            return;
          }
        });
        return <QuoteCard quote={item} key={idx} voted={voted} />;
      })}
    </div>
  );
};

export default Browse;
