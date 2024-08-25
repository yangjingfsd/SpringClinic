export const Signin = () => {
    return (
        <div className='form-signin w-100 m-auto"' id='container' style={{ backgroundColor: "#202124", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", height: "82vh" }}>

            <form id="sign_in" method="post" action="http://localhost:8080/authUser">
                <div className="form-floating">
                    <input type="email" name="username" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <br></br>
                <div className="form-floating">
                    <input type="password" name="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <br></br>
                <button className="btn btn-primary w-50 py-2" type="submit">Sign in</button>
                <br></br>
                <div className="text-center">
                    <p className="text-white">Not a member? <a href="#!">Register</a></p>
                </div>
            </form>

        </div>
    );
}


