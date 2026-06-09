import { supabase } from "../lib/supabase";

export const signIn = async function (email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    return { data, error };
};

export const signUp = async function (
    email: string,
    password: string,
    options: {
        data: {
            person: string;
            surname: string;
        };
    },
) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: options.data,
        },
    });
    if (data.user) {
        await supabase.from("users").insert({
            id: data.user.id,
            name: options.data.person,
            score: 0,
        });
    }

    return { data, error };
};
