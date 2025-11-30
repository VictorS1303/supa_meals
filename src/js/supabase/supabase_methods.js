// Sign in
export const signIn = async (email, password) =>
{
    const {data: signInData, error: signInError} = await supabaseClient
        .signInWithPassword(
            {
                email: email,
                password: password
            }
        )


    if(signInError)
    {
        console.log('Sign in error: ', signInError.hint, signInError.message)
    }
    else
    {
        console.log('Successfully signed in', signInData)
    }
}