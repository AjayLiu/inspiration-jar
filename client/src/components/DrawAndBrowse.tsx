import Browse from "./Browse";
import SingleDraw from "./SingleDraw"
import useGetAllQuotes from '@hooks/useGetAllQuotes'


const DrawAndBrowse: React.FC = () => {
    const allQuotes = useGetAllQuotes();

    return (
        <div>
            <SingleDraw quotesList={allQuotes}/>
            <Browse quotesList={allQuotes} />
        </div>
    )
}

export default DrawAndBrowse;