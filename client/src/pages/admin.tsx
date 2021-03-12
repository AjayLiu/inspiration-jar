import Browse from "@components/home/Browse";
import useGetQuotes from "@hooks/useGetQuotes";

const Admin: React.FC = () => {
  const allQuotesList = useGetQuotes("/admin");

  return (
    <div>
      <h1>Admin</h1>
      <Browse quotesList={allQuotesList} isAdmin />
    </div>
  );
};

export default Admin;
