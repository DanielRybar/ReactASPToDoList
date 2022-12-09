import axios from "axios";
import {useForm, Controller} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { Form, FormGroup, Label, Button, Input, Spinner, Alert } from "reactstrap";

export const Register = () => {
    const {/*register, */handleSubmit, control, watch, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data) => {
        setIsLoading(true);
        setError(null);

        axios.post("/api/Auth/register", 
        {
            username: data.username,
            password: data.password
        })
            .then((response) => {
                console.log(response.data);
                navigate("/sign/in");
            })
            .catch((error) => {
                setError(error.response.status + " - " + error.response.statusText)
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <>
            <h1>Register</h1>
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
                    <Label>Heslo znovu</Label>
                    <Controller name="passwordAgain" control={control} rules={{required: true, validate: (value) => value === watch("password")}} render={({ field }) => <Input type="password" {...field} />} />
                    {errors.passwordAgain?.type === 'required' && <p className='error'>Toto pole je povinné.</p>}
                    {errors.passwordAgain?.type === 'validate' && <p className='error'>Hesla se neshodují.</p>}
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit" disabled={isLoading}>
                        {isLoading ? <Spinner size="sm" color="light" /> : "Registrovat"}
                    </Button>
                </FormGroup>
                {error && <Alert color="danger">{error}</Alert>}
            </Form>

        </>
    );
};

export default Register;