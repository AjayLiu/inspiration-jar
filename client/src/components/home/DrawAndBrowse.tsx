import Browse from "@components/home/Browse";
import SingleDraw from "@components/home/SingleDraw"
import useGetQuotes from "@hooks/useGetQuotes";


const DrawAndBrowse: React.FC = () => {
    const allQuotes = useGetQuotes('', "GET");

    return (
        <div>
            <SingleDraw quotesList={allQuotes}/>
            <Browse quotesList={allQuotes} />
        </div>
    )
}

export default DrawAndBrowse;