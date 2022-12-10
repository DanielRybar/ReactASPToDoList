import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import { Spinner, Alert, Table, Button } from "reactstrap";

const Tasks = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [{ accessToken }] = useAuthContext();

    const getData = useCallback(() => { 
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

    const handleDelete = useCallback((id) => {
        axios.delete("/api/Tasks/" + id, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken
            }
        })
        .then((response) => {
            // setData(data => data.filter((item) => item.taskId !== id));
        })
        .catch((error) => { console.error(error); })
        .finally(() => getData())
     }, [accessToken, getData]);

     const handleFinish = useCallback((id, name, desc, time, userId, done) => { 
        let task = {
            id: id,
            name: name,
            description: desc,
            time: new Date(time).toJSON(),
            userId: userId,
            finished: done
        }
        console.log(task);
        axios.put("/api/Tasks/" + id, task, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken
            }
        })
        .then((response) => { })
        .catch((error) => { console.error(error); })
        .finally(() => getData())
     }, [accessToken, getData]);

    useEffect(() => {
        getData();
    }, [getData]);

    if (isLoading) {
        return <Spinner color="primary" />
    } else if (error) {
        return <Alert color="danger">{error}</Alert>
    } else if (data && Array.isArray(data) && data.length !== 0) {
        return (
            <div>
                <h1>Úkoly</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Název</th>
                            <th>Popis</th>
                            <th>Datum konce</th>
                            <th>Hotovo</th>
                            <th>ID uživatele</th>
                            <th>Akce</th>
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
                                <td>
                                    <Button color="danger" size="sm" onClick={e => handleDelete(item.taskId)}>Smazat</Button>
                                    {!item.finished 
                                    ? 
                                    <Button color="primary" size="sm" 
                                        onClick={e => 
                                            handleFinish(
                                                item.taskId, 
                                                item.name, 
                                                item.description, 
                                                item.time, 
                                                item.userId,
                                                true)
                                            }>Dokončit</Button> 
                                    : 
                                    <Button color="secondary" size="sm" 
                                        onClick={e => 
                                            handleFinish(
                                                item.taskId, 
                                                item.name, 
                                                item.description, 
                                                item.time, 
                                                item.userId,
                                                false)
                                            }>Znovu zadat</Button> 
                                    }
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </div>
        );
    } else if (data && Array.isArray(data) && data.length === 0) {
        return <Alert color="warning">Žádné úkoly</Alert>;
    } else {
        return <Alert color="secondary">Neznámá chyba</Alert>;
    }
};

export default Tasks;