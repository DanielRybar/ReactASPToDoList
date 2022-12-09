import {useAuthContext} from "../../providers/AuthProvider";

export const Home = () => {
    const [{profile, accessToken}] = useAuthContext();
    return(
        <>
        <h1>Token</h1>
        <pre>{accessToken}</pre>
        <h1>Profil</h1>
        <pre>{JSON.stringify(profile, " ", 4)}</pre>
        </>
    );
}

export default Home;