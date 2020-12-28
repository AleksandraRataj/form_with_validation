import React, {Component} from "react";
import './Form.css';


class Form extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        accept: false,
        message: "",

        errors: {
            username: false,
            email: false,
            password: false,
            accept: false,
        }
    }

    messages = {
        username_incorrect: "Username cannot be blank and cannot contain spaces!",
        email_incorrect: "Email must contain @, dot and cannot contain spaces!",
        password_incorrect: "Password must be longer than 8 characters and must contain uppercase letter, number and special character!",
        accept_incorrect: "You must accept the terms and conditions!"
    }

    handleChange = (e) => {
        const name = e.target.name;
        const type = e.target.type;

        if (type === "text" || type === "email" || type === "password") {
            const value = e.target.value;

            this.setState({
                [name]: value,
            });
        } else if (type === "checkbox") {
            const checked = e.target.checked;

            this.setState({
                [name]: checked,
            });
        }
    }

    formValidation = () => {
        let username = false;
        let email = false;
        let password = false;
        let accept = false;
        let correct = false;

        let email_validation = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        let password_validation = /([a-zA-Z0-9].*[!@#$%^&*?_,~])|([!@#$%^&*?_,~].*[a-zA-Z0-9])/;

        if (this.state.username.length > 0 && this.state.username.indexOf(" ") === -1) {
            username = true;
        }

        if (this.state.email.match(email_validation)) {
            email = true;
        }

        if (this.state.password.length > 8 && this.state.password.match(password_validation)) {
            password = true;
        }

        if (this.state.accept) {
            accept = true;
        }

        if (username && email && password && accept) {
            correct = true;
        }

        return ({
            username,
            email,
            password,
            accept,
            correct
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const validation = this.formValidation();

        if (validation.correct) {
            this.setState({
                username: "",
                email: "",
                password: "",
                accept: false,
                message: "Form successfully sent!",

                errors: {
                    username: false,
                    email: false,
                    password: false,
                    accept: false,
                }
            })
        } else {
            this.setState({
                errors: {
                    username: !validation.username,
                    email: !validation.email,
                    password: !validation.password,
                    accept: !validation.accept,
                }
            });
        }
    }

    render() {
        return (
            <div className={"App"}>

                <div className="header">
                    <h1>Sing Up</h1>
                </div>

                <form onSubmit={this.handleSubmit} noValidate>

                    <label htmlFor="user">Your username:
                        <input type="text" id="user" name="username" placeholder={"Flower19"}
                               value={this.state.username} onChange={this.handleChange}/>
                        {this.state.errors.username ? <span>{this.messages.username_incorrect}</span> : <span> </span>}
                    </label>

                    <label htmlFor="email">Your email:
                        <input type="email" id="email" name="email" placeholder={"a@example.com"}
                               value={this.state.email} onChange={this.handleChange}/>
                        {this.state.errors.email ? <span>{this.messages.email_incorrect}</span> : <span> </span>}
                    </label>

                    <label htmlFor="password">Your password:
                        <input type="password" id="password" name="password" placeholder={"password"}
                               value={this.state.password} onChange={this.handleChange}/>
                        {this.state.errors.password ? <span>{this.messages.password_incorrect}</span> : <span> </span>}
                    </label>

                    <label htmlFor="accept">
                        <input className={"checkbox"} type="checkbox" id="accept" name="accept"
                               checked={this.state.accept} onChange={this.handleChange}/>
                        I accept the <strong>terms and conditions</strong>.
                        {this.state.errors.accept ? <span>{this.messages.accept_incorrect}</span> : <span> </span>}
                    </label>

                    <button>Sing up</button>

                    {this.state.message ? <h3>{this.state.message}</h3> : <h3> </h3>}
                </form>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.message !== ""){
            setTimeout(() => {
                this.setState({
                    message: "",
                })
            }, 3000);
        }
    }
}

export default Form;
