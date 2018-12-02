import React, { Component } from "react";
import houseimage from '../../../images/icon-desk.png';
import {NavItem, NavLink} from 'reactstrap'
import logo from '../../../images/blue-logo.png';



class VisitorForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newUser: {
                age: "",
                gender: "",
            },

            genderOptions: ["Male", "Female", "Non-Binary"],
            ageOptions: ["Youth", "Adult (18+)", "Senior(65+)"]
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    /* This lifecycle hook gets executed when the component mounts */
    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(
            prevState => ({
                newUser: {
                    ...prevState.newUser,
                    [name]: value
                }
            }),
            () => console.log(this.state.newUser)
        );
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let userData = this.state.newUser;

        fetch("http://example.com", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(response => {
            response.json().then(data => {
                console.log("Successful" + data);
            });
        });
    }

    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            newUser: {
                age: "",
                gender: "",
            }
        });
    }
    render() {
        {/* Selector Definition*/}
        const Select = props => {
            return (
                <div className="form-group">
                    <label for={props.name}> {props.title} </label>
                    <select
                        id={props.name}
                        name={props.name}
                        value={props.value}
                        onChange={props.handleChange}
                        className="form-control"
                    >
                        <option value="" disabled>
                            {props.placeholder}
                        </option>
                        {props.options.map(option => {
                            return (
                                <option key={option} value={option} label={option}>
                                    {option}
                                </option>
                            );
                        })}
                    </select>
                </div>
            );
        };
        {/* Button Definition*/}
        const Button = props => {
            console.log(props.style);
            return (
                <button
                    style={props.style}
                    className={
                        props.type == "primary" ? "btn btn-success" : "btn btn-danger"
                    }
                    onClick={props.action}
                >
                    {props.title}
                </button>
            );
        };

        return (
            <div>
                        <div className="Navbar">
          <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
            <a className="navbar-brand" href="#"><img style={{width: "50px", height: "50px"}} src={logo} alt="logo"/>&nbsp; Sheltermap</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="navbar-nav ml-auto">
                <NavItem>
                  <NavLink href="/shelters">Shelter List</NavLink>
                </NavItem>
                <a href="/signin"><button type="button" className="btn btn-primary">Shelter Worker's Portal</button></a>
              </div>
            </div>
          </nav>
        </div>
            <h1 style={{padding: "16px", position: "absolute"}}>Please Sign In!</h1>
            <div className="row">
            <form className="col-6" style={{padding: "83px"}} onSubmit={this.handleFormSubmit}>
                {/* Age Selector*/}
                <Select
                    name={"age"}
                    title={"Age"}
                    options = {this.state.ageOptions}
                    value={this.state.newUser.age}
                    placeholder={"Select Visitor's Age"}
                    handleChange={this.handleInput}
                />{" "}
                {/* Gender Selector */}
                <Select
                    title={"Gender"}
                    name={"gender"}
                    options={this.state.genderOptions}
                    value={this.state.newUser.gender}
                    placeholder={"Select Visitor's Gender"}
                    handleChange={this.handleInput}
                />{" "}
                <Button
                    action={this.handleFormSubmit}
                    type={"primary"}
                    title={"Submit"}
                    style={buttonStyle}
                />{" "}
                {/*Submit Button*/}
                <Button
                    action={this.handleClearForm}
                    type={"secondary"}
                    title={"Clear"}
                    style={buttonStyle}
                />{" "}
                {/* Clear Form Button */}
            </form>
            <div class="col-md-6">
                <img src={houseimage} style={{height: "500px", width:"500px", padding: "47px"}} alt="house-image"/>
            </div>
            </div>
            </div>

            
        );
    }
}

const buttonStyle = {
    margin: "10px 10px 10px 10px"
};

export default VisitorForm;
