import React from 'react';

import Form from './Register'

class SignUp extends React.Component{
    state = {
        firstName:'',
        lastName: '',
        username:'',
        password:'',
        email:'',
        validateFn: false,
        validateLn: false,
        validateUn: false,
        validatePs: false,
        validateEm: false
    }

    handleChange = e => {
        const {name, value, id} = e.target
        this.setState({
            [name]: value,
            [id]: false
        })
    }

    handleBlur = e => {
        const {value, id} = e.target
        // console.log(value)
        if(value===''){
            this.setState({
                [id]: true
            })
        }
        
    }

    render(){
        return(
            <Form
                username = {this.state.username}
                password = {this.state.password}
                email = {this.state.email}
                lastName = {this.state.password}
                firstName = {this.state.firstName}
                handleChange = {this.handleChange}
                validateFn = {this.state.validateFn}
                validateLn = {this.state.validateLn}
                validateUn = {this.state.validateUn}
                validatePs = {this.state.validatePs}
                validateEm = {this.state.validateEm}
                handleBlur = {this.handleBlur}
            />
        )
    }
}

export default SignUp