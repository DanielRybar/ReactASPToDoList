import axios from "axios";
import {useForm, Controller} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { Form, FormGroup, Label, Button, Input, Spinner, Alert } from "reactstrap";
import {useAuthContext} from "../../providers/AuthProvider"

export const AddTask = () => {
    const {/*register, */handleSubmit, control, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [{accessToken}] = useAuthContext();
    const authorization = "Bearer " + accessToken;

    const onSubmit = (data) => {
        setIsLoading(true);
        setError(null);
        
        let obj = {
            name: data.name,
            description: data.description ? data.description : "",
            time: new Date(data.time).toJSON(),
            done: data.done ? true : false,
            userId: data.userId
        } 
        console.log(obj)

        axios.post("/api/Tasks", obj, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authorization
            }
        })
            .then((response) => {
                console.log(response);
                navigate("/tasks");
            })
            .catch((error) => {
                setError(error.response.status + " - " + error.response.statusText)
                //console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <>
            <h1>Přidat úkol</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label>Název úkolu</Label>
                    <Controller name="name" control={control} rules={{required: true}} render={({ field }) => <Input {...field} />} />
                    {errors.name?.type === 'required' && <p className='error'>Toto pole je povinné.</p>}
                </FormGroup>
                <FormGroup>
                    <Label>Popis úkolu</Label>
                    <Controller name="description" control={control} render={({ field }) => <Input {...field} />} />
                </FormGroup>
                <FormGroup>
                    <Label>Do kdy</Label>
                    <Controller name="time" control={control} rules={{required: true, validate: value => new Date(value) >= new Date()}} render={({ field }) => <Input type="date" {...field} /*value={year && month && day ? year + "-" + month + "-" + day : new Date().toISOString().slice(0, 10)}*/ />} />
                    {errors.time?.type === 'required' && <p className='error'>Toto pole je povinné.</p>}
                    {errors.time?.type === 'validate' && <p className='error'>Datum dokončení nemůže být v minulosti.</p>} 
                </FormGroup>
                <FormGroup check>
                    <Label>Hotovo</Label>
                    <Controller name="done" control={control} render={({ field }) => <Input type="checkbox" {...field} />} />
                </FormGroup>
                <FormGroup>
                    <Label>ID uživatele</Label>
                    <Controller name="userId" control={control} rules={{required: true, validate: value => value > 0 && Number(value)}} render={({ field }) => <Input {...field} />} />
                    {errors.userId?.type === 'required' && <p className='error'>Toto pole je povinné.</p>}
                    {errors.userId?.type === 'validate' && <p className='error'>ID uživatele musí být kladné číslo.</p>}
                </FormGroup>
                <FormGroup>
                    <Button type="submit" color="primary">                        
                        {isLoading ? <Spinner size="sm" color="light" /> : "Přidat"}
                    </Button>
                </FormGroup>
            </Form>
            <div>
                {error ? <Alert color="danger">{error}</Alert> : ""}
            </div>
        </>
    );
};

export default AddTask;