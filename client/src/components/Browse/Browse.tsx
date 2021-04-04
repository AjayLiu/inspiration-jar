import FinalQuoteCard from "@components/FinalQuoteCard/FinalQuoteCard";
import QuoteCard from "@components/QuoteCard/QuoteCard";
import { Quote, Vote } from "@hooks/quoteTypes";
import Fuse from "fuse.js";
import React, { useEffect, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import styles from "./Browse.module.scss";

interface Props {
  quotesList: Array<Quote>;
  votesList?: Array<Vote>;
  isUserQuotes?: boolean;
  isAdmin?: boolean;
  showFinalQuoteCard?: boolean;
}

const Browse: React.FC<Props> = (props) => {
  const [quotesList, setQuotesList] = useState(props.quotesList);
  const [searchText, setSearchText] = useState("");
  const [initFinished, setInitFinished] = useState(false);

  useEffect(() => {
    setQuotesList(props.quotesList);
  }, [props.quotesList]);

  // only runs once quotes are finished fetching
  useEffect(() => {
    if (quotesList.length > 0 && !initFinished) {
      sortList(sortOption);
      setInitFinished(true);
    }
  }, [quotesList]);

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
      setShownQuotesList(newList);
    } else {
      setShownQuotesList(props.quotesList);
    }
  };

  const sortList = (sortCode) => {
    const newList = [...quotesList];
    switch (sortCode) {
      case "liked":
        newList.sort((a, b) => (a.voteCount > b.voteCount ? -1 : 1));
        break;
      case "newest":
        newList.sort((a, b) => (a.quoteID > b.quoteID ? -1 : 1));
        break;
      case "oldest":
        newList.sort((a, b) => (a.quoteID > b.quoteID ? 1 : -1));
        break;
    }
    setQuotesList(newList);
  };

  const [sortOption, setSortOption] = useState("newest");

  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  useEffect(() => {
    sortList(sortOption);
  }, [sortOption]);

  const [shownQuotesList, setShownQuotesList] = useState<Array<Quote>>();

  //try loading 5 at once, but if there are less than 5 quotes to display then just display 1 at a time
  const quotesPerLoad = quotesList && quotesList.length < 5 ? 1 : 5;
  const [numQuotesToShow, setNumQuotesToShow] = useState(quotesPerLoad);
  const [allowLoadMore, setAllowLoadMore] = useState(true);
  useEffect(() => {
    if (quotesList.length > 0) {
      //last quote
      if (numQuotesToShow > quotesList.length) {
        if (props.showFinalQuoteCard) {
          setShownQuotesList(quotesList);
          setShowFinalQuoteCard(true);
        }
      } else {
        const newListToShow = quotesList.slice(0, numQuotesToShow);
        setShownQuotesList(newListToShow);
        setAllowLoadMore(true);
      }
    }
  }, [numQuotesToShow, quotesList]);

  const loadMoreQuotes = () => {
    setNumQuotesToShow(numQuotesToShow + quotesPerLoad);
  };

  const onHitBottomScreen = () => {
    if (allowLoadMore) {
      loadMoreQuotes();
    }
    setAllowLoadMore(false);
  };

  let screenHeight = 800;

  useEffect(() => {
    screenHeight = window.innerHeight;
  }, []);
  useBottomScrollListener(onHitBottomScreen, {
    offset: screenHeight * 0.2,
  });

  const [showFinalQuoteCard, setShowFinalQuoteCard] = useState(false);

  return (
    <div>
      <h2>Browse</h2>
      <div className={styles.filterBar}>
        <div className={styles.sortBar}>
          <label htmlFor="sort" className={styles.sortLabel}>
            Sort By:
          </label>
          <select
            name="sort"
            className={styles.sortSelect}
            onChange={(e) => onSortChange(e)}
            value={sortOption}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="liked">Most Liked</option>
          </select>
        </div>
        <div className={styles.searchBar}>
          <img
            src="img/search.svg"
            alt="search icon"
            className={styles.searchImg}
          />
          <input
            type="text"
            value={searchText}
            placeholder="Search..."
            onChange={(e) => onSearchChange(e)}
          />
        </div>
      </div>

      <div className={styles.quoteCardList}>
        {shownQuotesList &&
          shownQuotesList.map((item, idx) => {
            let voted = false;
            if (!props.isUserQuotes && !props.isAdmin) {
              props.votesList.forEach((obj) => {
                if (obj.quoteID == item.quoteID) {
                  voted = true;
                  return;
                }
              });
            }
            return (
              <QuoteCard
                quote={item}
                key={idx}
                voted={voted}
                isUserQuotes={props.isUserQuotes}
                isAdmin={props.isAdmin}
              />
            );
          })}
      </div>
      {showFinalQuoteCard && <FinalQuoteCard />}
    </div>
  );
};

export default Browse;
