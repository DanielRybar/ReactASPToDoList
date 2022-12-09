import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import { Spinner, Alert, Table } from "reactstrap";

const Tasks = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [{ accessToken }] = useAuthContext();

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        axios.get("/api/Tasks", {
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
            <div>
                <h1>Úkoly</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Time</th>
                            <th>Done</th>
                            <th>UserId</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((item) => {
                        return (
                            <tr key={item.taskId}>
                                <td>{item.taskId}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{new Date(item.time).toLocaleDateString()}</td>
                                <td>{item.finished ? "Ano" : "Ne"}</td>
                                <td>{item.userId}</td>
                                
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </div>
        );
    } else {
        return <Alert color="secondary">Neznámá chyba</Alert>;
    }
};

export default Tasks;