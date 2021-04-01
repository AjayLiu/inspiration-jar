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
      <a href="/account" className={styles.submitQuoteLink}>
        Submit a quote!
      </a>
    </div>
  );
};

export default FinalQuoteCard;
