import axios from "axios";
import {useForm} from "react-hook-form";
import {useAuthContext, SET_ACCESS_TOKEN} from "../../providers/AuthProvider"
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const {register, handleSubmit, watch, formState} = useForm();
    const [, dispatch] = useAuthContext();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        axios.post("/api/Auth/authenticate", {
            username: data.username,
            password: data.password
        })
        .then(response => {
            dispatch({type: SET_ACCESS_TOKEN, payload: response.data.token})
            navigate("/");
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Jméno</label>
                    <input {...register("username")} />
                </div>
                <div>
                    <label>Heslo</label>
                    <input {...register("password")} />
                </div>
                <div>
                    <button type="submit">Odeslat</button>
                </div>
            </form>
        </>
    );
}

export default Login;