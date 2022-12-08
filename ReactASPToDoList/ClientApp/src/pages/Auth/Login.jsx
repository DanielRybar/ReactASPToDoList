import axios from "axios";
import {useForm} from "react-hook-form";
import {useAuthContext, SET_ACCESS_TOKEN} from "../../providers/AuthProvider"
import {useNavigate} from "react-router-dom";
import { useState } from "react";

export const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [, dispatch] = useAuthContext();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data) => {
        setIsLoading(true);
        let obj = {
            username: data.username,
            password: data.password
        }
        console.log(obj);
        axios.post("/api/Auth/authenticate", obj)
        .then((response) => {
            dispatch({type: SET_ACCESS_TOKEN, payload: response.data.token})
            console.log("OK");
            navigate("/");
        })
        .catch((error) => {
            setError(error.message);
            console.error(error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const md5Hasher = (pwd) => {

    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Jméno</label>
                    <input type="text" {...register("username", {required: true})} />
                    {errors.username?.type === 'required' && <p className='error'>Toto pole je povinné.</p>}
                </div>
                <div>
                    <label>Heslo</label>
                    <input type="password" {...register("password", {required: true})} />
                    {errors.password?.type === 'required' && <p className='error'>Toto pole je povinné.</p>}
                </div>
                <div>
                    <button type="submit">Odeslat</button>
                </div>
            </form>
            <div>
                {isLoading ? "Načítám" : ""}
                {error ? error : ""}
            </div>
        </>
    );
}

export default Login;