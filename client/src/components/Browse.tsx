import useGetAllQuotes from '@hooks/useGetAllQuotes'

const Browse: React.FC = () => {
    
    const quotesList = useGetAllQuotes();

    return (
        <div>
            {quotesList.map((item, idx)=>{
                return <div key={idx}>{item.quote_content}</div>
            })}
        </div>
    )
}

export default Browse;