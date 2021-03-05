import Browse from "@components/home/Browse";
import SingleDraw from "@components/home/SingleDraw";
import useGetQuotes from "@hooks/useGetQuotes";
import useGetVotes from "@hooks/useGetVotes";

const DrawAndBrowse: React.FC = () => {
  const allQuotes = useGetQuotes("");
  const allVotes = useGetVotes();
  return (
    <div>
      <SingleDraw quotesList={allQuotes} votesList={allVotes} />
      <Browse quotesList={allQuotes} votesList={allVotes} />
    </div>
  );
};

export default DrawAndBrowse;