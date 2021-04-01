import Browse from "@components/Browse/Browse";
import SingleDraw from "@components/SingleDraw/SingleDraw";
import useGetQuotes from "@hooks/useGetQuotes";
import useGetVotes from "@hooks/useGetVotes";

const DrawAndBrowse: React.FC = () => {
  const allQuotes = useGetQuotes("");
  const allVotes = useGetVotes();
  return (
    <div>
      <SingleDraw quotesList={allQuotes} votesList={allVotes} />
      <Browse
        quotesList={allQuotes}
        votesList={allVotes}
        showFinalQuoteCard={true}
      />
    </div>
  );
};

export default DrawAndBrowse;
