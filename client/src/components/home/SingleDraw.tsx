import { useEffect, useState } from "react";
import { Quote } from "@hooks/quoteTypes";
import QuoteCard from "@components/QuoteCard";
import styles from "@styles/home/SingleDraw.module.css";

interface Props {
  quotesList: Array<Quote>;
}

const SingleDraw: React.FC<Props> = (props) => {
  const quotesList = props.quotesList;
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quote, setQuote] = useState<Quote>();
  useEffect(() => {
    setQuote(quotesList[quoteIndex]);
  }, [quotesList, quoteIndex]);

  const onQuoteClick = () => {
    setQuoteIndex(quoteIndex + 1);
  };

  return <QuoteCard quote={quote} clickHandler={() => onQuoteClick()} />;
};

export default SingleDraw;
