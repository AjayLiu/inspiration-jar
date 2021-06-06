import Link from "next/link";
import styles from "./FinalQuoteCard.module.scss";
interface Props {
  reshuffleCallback?;
}

const FinalQuoteCard: React.FC<Props> = (props) => {
  return (
    <div className={styles.lastQuoteCard}>
      <div>That's all the quotes we have so far!</div>
      {props.reshuffleCallback && (
        <button
          className={styles.reshuffleButton}
          onClick={() => props.reshuffleCallback()}
        >
          Reshuffle quotes
        </button>
      )}

      <Link href="/account">
        <a className={styles.submitQuoteLink}>Submit a quote!</a>
      </Link>
    </div>
  );
};

export default FinalQuoteCard;
