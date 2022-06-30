import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
const ErrorContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    
    background-color: rgb(255 128 128);    
`

const WrongMessage = styled.div`
    text-align: center;
    color: white;
    font-family: inherit;
    font-size: inherit;
`

const Signin = () => {
    const url = useLocation();
    let navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
    })
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);

    console.log(url);

    const handleUserInfoChange = (e) => {
        const { id, value } = e.target
        setUserInfo((currentState) => ({
            ...currentState,
            [id]: value,
        }));
        console.log(userInfo);
    }

    // Sorry, the password you entered doesn't match what we have on file.

    const handleSubmit = async (event) => {
        event.preventDefault()
        setButtonClicked(true);

        let res = await fetch('http://localhost:8082/signin', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userInfo)
        })
        .then(response => {
            //console.log("RESPONSE AFTER SIGNING IN", response.json())
            if(response.ok) {
                setIsAuthenticated(true);
                //navigate('/home/1');
                return response.json();
            } else if(response.status === 401){
                setIsAuthenticated(false);
                console.log("Unsuccessfull login - ui from ui")
                return;
            }
        })
        .catch(error => console.log('error is', error));
        
        // res is the id of the user that signed in
        
        navigate(`/home/${res}`)
        
        console.log("RES VALUE", res);
        
      }
    

    // // Handling the form submission
    // const handleSubmit = () => {
    //     if(userInfo.firstName === '' || userInfo.lastName === '' ||
    //        userInfo.email === '' || userInfo.password === '' ||
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
        <FormTitle>Sign In</FormTitle>
        <RegisterContainer>
        
            <form onSubmit={handleSubmit}>
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
                        Log In
                    </SubmitButton>
                </ButtonContainer>
            </form>
        </RegisterContainer>
        {!isAuthenticated && buttonClicked ? <ErrorContainer><WrongMessage>Sorry the password you entered doesnt match what we have on file</WrongMessage></ErrorContainer>: ''}
        <div></div>
        <div>Dont Have an Account? <Link to="/register">Register Here</Link></div>
    </PageContainer>
    

    )
}

export default Signin;