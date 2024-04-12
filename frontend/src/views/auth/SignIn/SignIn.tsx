import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Authentication</h3>
                <p>Please enter your credentials to sign in!</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
