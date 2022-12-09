import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import { Spinner, Alert, Table } from "reactstrap";

export const List = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ accessToken }] = useAuthContext();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    axios.get("/api/Users", {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken
        }
    })
        .then((response) => { 
            setData(response.data);
        })
        .catch((error) => {
            setError(error.response.status + " - " + error.response.statusText);
            console.error(error);
        })
        .finally(() => {
            setIsLoading(false);
        })
  }, [accessToken]);

    if (isLoading) {
        return <Spinner color="primary" />
    } else if (error) {
        return <Alert color="danger">{error}</Alert>
    } else if (data) {
        return (
            <>
                <h1>Users</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Jméno</th>
                            <th>Heslo (MD5)</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((user) => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.userName}</td>
                            <td>{user.password}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </>
        );
    } else {
        return <Alert color="secondary">Neznámá chyba</Alert>;
    }
};

export default List;