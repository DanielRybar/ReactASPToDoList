import axios from "axios";
import {useForm, Controller} from "react-hook-form";
import {useAuthContext, SET_ACCESS_TOKEN} from "../../providers/AuthProvider"
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { Form, FormGroup, Label, Button, Input, Spinner, Alert } from "reactstrap";

export const Login = () => {
    const {/*register, */handleSubmit, control, formState: {errors}} = useForm();
    const [, dispatch] = useAuthContext();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data) => {
        setIsLoading(true);
        setError(null);

        axios.post("/api/Auth/authenticate", 
        {
            username: data.username,
            password: data.password
        })
            .then((response) => {
                dispatch({type: SET_ACCESS_TOKEN, payload: response.data.value})
                //console.log(response.data.value);
                navigate("/");
            })
            .catch((error) => {
                //setError(error.response.status + " - " + error.response.statusText)
                setError(errorCode(error.response.status));
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const errorCode = (error) => { 
        error = Number(error);
        switch (error) {
            case 401: return "Špatné heslo.";
            case 404: return "Uživatel neexistuje.";
            default: return "Nastala neznámá chyba.";
        }
    }

    return (
        <>
            <h1>Přihlášení uživatele</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label>Jméno</Label>
                    <Controller name="username" control={control} rules={{required: true}} render={({ field }) => <Input {...field} />} />
                    {errors.username?.type === 'required' && <p className='error'>Toto pole je povinné.</p>}
                </FormGroup>
                <FormGroup>
                    <Label>Heslo</Label>
                    <Controller name="password" control={control} rules={{required: true}} render={({ field }) => <Input type="password" {...field} />} />
                    {errors.password?.type === 'required' && <p className='error'>Toto pole je povinné.</p>}
                </FormGroup>
                <FormGroup>
                    <Button type="submit" color="primary">                        
                        {isLoading ? <Spinner size="sm" color="light" /> : "Přihlásit se"}
                    </Button>
                </FormGroup>
            </Form>
            <div>
                {error ? <Alert color="danger">{error}</Alert> : ""}
            </div>
        </>
    );
}

export default Login;