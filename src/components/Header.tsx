
interface Props{
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return <h1 className="title">{title}</h1>
}

export default Header;