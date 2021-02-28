import Browse from "@components/home/Browse";
import SingleDraw from "@components/home/SingleDraw"
import useFetchQuotes from "@hooks/useFetchQuotes";


const DrawAndBrowse: React.FC = () => {
    const allQuotes = useFetchQuotes('', "GET");

    return (
        <div>
            <SingleDraw quotesList={allQuotes}/>
            <Browse quotesList={allQuotes} />
        </div>
    )
}

export default DrawAndBrowse;