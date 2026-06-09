import { AppRouter } from "./app/router/AppRouter";
import { UserContext } from "./context/UserContext";
import { useContext, useEffect } from "react";
import { supabase } from "./lib/supabase";
import { useNavigate } from "react-router-dom";
function App() {
    const navigate = useNavigate();
    const userCtx = useContext(UserContext)!;
    useEffect(() => {
        const load = async () => {
            const data = await supabase.auth.getSession();
            const user = data.data.session?.user;
            if (user) {
                userCtx.setUser({
                    id: user.id,
                    email: user.email!,
                    name: user.user_metadata.person,
                    score: 0,
                });
            } else {
                navigate("/register");
            }
        };
        load();
    }, []);
    return <AppRouter />;
}

export default App;
