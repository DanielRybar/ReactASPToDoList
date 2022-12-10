import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import {
    Input,
    Form,
    FormGroup,
    Label,
    Spinner,
    Alert,
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import { useForm, Controller, useFieldArray } from "react-hook-form";

export const List = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [{ accessToken }] = useAuthContext();

    const [id, setId] = useState(null);
    const [modal, setModal] = useState(false);
    const [modalError, setModalError] = useState(null);
    const openModal = () => setModal(true);
    const {/*register, */handleSubmit, control, watch, setValue, formState: { errors } } = useForm();

    const onSubmit = (data) => { 
        console.log(id);
        axios.put("/api/Users/" + id, {
            id: id,
            username: data.username,
            password: data.password
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken
            }
        })
            .then((response) => {
                setModal(false);
                getUsers();
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    setModalError("Uživatel s tímto jménem již existuje.");
                } else
                    setModalError(error.response.status + " - " + error.response.statusText);
            })
    }

    const getUsers = useCallback(() => {
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

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (isLoading) {
        return <Spinner color="primary" />
    } else if (error) {
        return <Alert color="danger">{error}</Alert>
    } else if (data && Array.isArray(data) && data.length !== 0) {
        return (
            <>
                <Modal isOpen={modal}>
                    <ModalHeader>Změnit údaje</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <Label>Jméno</Label>
                                <Controller name="username" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} />} />
                                {errors.username?.type === 'required' && <p className='error'>Toto pole je povinné.</p>}
                            </FormGroup>
                            <FormGroup>
                                <Label>Heslo</Label>
                                <Controller name="password" control={control} rules={{ required: true }} render={({ field }) => <Input type="password" {...field} />} />
                                {errors.password?.type === 'required' && <p className='error'>Toto pole je povinné.</p>}
                            </FormGroup>
                            <FormGroup>
                                <Label>Heslo znovu</Label>
                                <Controller name="passwordAgain" control={control} rules={{ required: true, validate: (value) => value === watch("password") }} render={({ field }) => <Input type="password" {...field} />} />
                                {errors.passwordAgain?.type === 'required' && <p className='error'>Toto pole je povinné.</p>}
                                {errors.passwordAgain?.type === 'validate' && <p className='error'>Hesla se neshodují.</p>}
                            </FormGroup>
                            <FormGroup>
                                <Button color="success" type="submit">Uložit</Button>
                                {modalError ? <Alert color="danger">{modalError}</Alert> : null}
                            </FormGroup>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={e => setModal(false)}>Zavřít okno</Button>
                    </ModalFooter>
                </Modal>

                <h1>Uživatelé</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Jméno</th>
                            <th>Heslo (MD5)</th>
                            <th>Akce</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user) => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.userName}</td>
                                <td>{user.password}</td>
                                <td><Button size="sm" color="dark" outline onClick={e => {
                                    setId(user.userId); 
                                    setValue("username", user.userName); 
                                    setValue("password", "");
                                    setValue("passwordAgain", "");
                                    setModalError(null);
                                    openModal();
                                    }}>Změnit údaje</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        );
    } else if (data && Array.isArray(data) && data.length === 0) {
        return <Alert color="warning">Žádné údaje</Alert>;
    } else {
        return <Alert color="secondary">Neznámá chyba</Alert>;
    }
};

export default List;