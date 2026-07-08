import './Auth.css'

const Login = () => {
    return (  
        <section className="auth-page" id="login">
            <div className="auth-card">
                <div className="auth-inputs">
                    <p>Enter Email:</p>
                    <input type="email" placeholder="Email" />
                    <p>Enter Password:</p>
                    <input type="password" placeholder="Password"/>
                </div>
            
            </div>
        </section>
    );
}
 
export default Login;