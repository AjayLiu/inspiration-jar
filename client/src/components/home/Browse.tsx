import QuoteCard from "@components/QuoteCard";
import { Quote, Vote } from "@hooks/quoteTypes";
import styles from "@styles/Browse.module.css";
import Fuse from "fuse.js";
import React, { useEffect, useState } from "react";

interface Props {
  quotesList: Array<Quote>;
  votesList: Array<Vote>;
}

const Browse: React.FC<Props> = (props) => {
  const [quotesList, setQuotesList] = useState(props.quotesList);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setQuotesList(props.quotesList);
  }, [props.quotesList]);

  let options = {
    keys: ["quoteContent"],
    threshold: 0.2,
  };

  const fuse = new Fuse(props.quotesList, options);
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchVal = e.target.value;
    setSearchText(searchVal);
    if (searchVal != "") {
      const filterResult = fuse.search(searchVal);

      const newList = filterResult.map((obj) => {
        return obj.item;
      });
      setQuotesList(newList);
    } else {
      setQuotesList(props.quotesList);
    }
  };

  return (
    <div>
      <h2>Browse</h2>
      <input
        className={styles.searchBar}
        type="text"
        value={searchText}
        placeholder="Search..."
        onChange={(e) => onSearchChange(e)}
      />
      {quotesList.map((item, idx) => {
        let voted = false;
        props.votesList.forEach((obj) => {
          if (obj.quoteID == item.quoteID) {
            voted = true;
            return;
          }
        });
        return (
          <QuoteCard
            quote={item}
            key={idx}
            voted={voted}
            showVoteButton={true}
          />
        );
      })}
    </div>
  );
};

export default Browse;
