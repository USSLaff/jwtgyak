import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export function Bejelentkezes() {
    const [isLoginPending, setLoginPending] = useState(false);
    const nav = useNavigate();

    function LoginFormSubmit(e){
        e.persist();
        e.preventDefault();
        setLoginPending(true);
        Login(e.target.username.value,e.target.password.value)
        .then(()=>{
            setLoginPending(false);
            nav("/szallasok");
        }).catch((err)=>{
            alert("Helytelen bejelentkezési adatok.");
            setLoginPending(false);

        })
    }


    if (isLoginPending) {
        return (
            <div className="align-items-center">
                <div className="spinner-border text-danger" role="status">

                </div>
            </div>
        )
    }

    return (
        <div className="container-fluid d-flex justify-content-center h-100 login-container">
            <div className="card login-card">
                <div className="card-header login-card-header">
                    <h5 className="card-title text-center">Bejelentkezés</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={LoginFormSubmit}>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                username
                            </label>
                            <input type="text" name="text" className="form-control" id="username" placeholder="E-mail">

                            </input>
                        </div>

                        <div className="input-group form-group">
                            <label htmlFor="password" className="form-label">
                                Jelszó
                            </label>
                            <input type="password" name="password" className="form-control" id="password" placeholder="password">

                            </input>
                        </div>

                        <div className="form-group">
                            <button type="submmit" className="btn float-right btn-warning">Bejelentkezés</button>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    )

}