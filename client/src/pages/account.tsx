import {useState, useEffect} from 'react'

const Account: React.FC = () => {
    const [email, setEmail] = useState('loading...');

    useEffect( () => {
        const getEmail = async () => {
            const response = await fetch('/api/login');
            const data = await response.json();
            setEmail(data)
        }
        getEmail();
    }, [])

    return (
        <div>
            Currently logged in as {email}
        </div>
    )
}

export default Account;