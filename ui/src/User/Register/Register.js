import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';

const PageContainer = styled.div`
    padding-top: 10px;
`;

const PageTitle = styled.div`
    font-size: 30px;
    padding-bottom: 10px;
    padding-left: 100px;
`;
const RegisterContainer = styled.div`
    display: flex;
    flex-drection: column;
    justify-content: center;
    align-items: center;
`;

const FormTitle = styled.div`
    font-size: 30px;
    padding-bottom: 10px;
    text-align: center;
`;

// const FormContainer = styled.div`
//     justify-content: flex-start;
//     width: 15%;
// `;

const InputSection = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    label {
        margin-bottom: 5px;
    }
    input {
        padding: 5px;
        border: 2px solid #e3e3e3
        :focus {
            outline: 2px solid #9da631;
            border: none;
        }
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 15px;    
`
const SubmitButton = styled.button`
    background-color: #487eb7;
    border: none;
    border-radius: 2px;
    padding: 8px 10px 8px 10px;
    color: white;
    font-family: inherit;
    font-size: inherit;
`

// const ErrorSection = styled.div`
//   color: red;
// `;

const Register = () => {
    let navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
    })


    const handleUserInfoChange = (e) => {
        const { id, value } = e.target
        console.log('id', id);
        console.log('value', value)
        setUserInfo((currentState) => ({
            ...currentState,
            [id]: value,
        }));
        console.log(userInfo);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let res = await fetch('http://localhost:8082/users', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userInfo)
        })
        
        navigate('/signin');
        console.log(res);
        
      }

    // // Handling the form submission
    // const handleSubmit = () => {
    //     if(userInfo.firstName === '' || userInfo.lastName === '' ||
    //        userInfo.username === '' || userInfo.password === '' ||
    //        userInfo.passwordConfirmation === '') {
    //             setError(true);
    //     } else {
    //         setSubmitted(true);
    //         setError(false);
    //     }
    // }


    return(
    <PageContainer>
        <PageTitle>Blogger</PageTitle>
        <FormTitle>Register</FormTitle>
        <RegisterContainer>
        
            <form onSubmit={handleSubmit}>
                <InputSection>
                    <label htmlFor="">First Name</label>
                    <input type="text" id="firstname" placeholder="First Name" maxLength="25"
                           onChange={handleUserInfoChange}/>
                </InputSection>
                <InputSection>
                    <label htmlFor="">Last Name</label>
                    <input type="text" id="lastname" placeholder="Last Name" 
                             onChange={handleUserInfoChange} maxLength="25"/>
                </InputSection>
                <InputSection>
                    <label htmlFor="">Username</label>
                    <input type="text" id="username" placeholder="Username" 
                             onChange={handleUserInfoChange} maxLength="25"/>
                </InputSection>
                <InputSection>
                    <label htmlFor="">Password</label>
                    <input type="password" id="password" placeholder="password" 
                             onChange={handleUserInfoChange} maxLength="25"/>
                </InputSection>
                <ButtonContainer>
                    <SubmitButton type="submit">
                        Register
                    </SubmitButton>
                </ButtonContainer>
            </form>
            
        </RegisterContainer>
        <div>Already have an account? <Link to="/signin">Login Here</Link></div>
    </PageContainer>
    

    )
}

export default Register;