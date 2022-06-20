import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import decode from 'jwt-decode';
//import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actionType from '../../constants/actionTypes.js';
import image from '../../images/image.png';

const Login = (props) => {
    //getting user profile from localstorage
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    //const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //redirect to auth or home page
    const signin = () => {
        if (localStorage.getItem('profile')) {
            window.location.href = '/home'
        }
        else {
            window.location.href = '/auth'
        }
    }

    useEffect(() => {
        const token = user?.token;

        //check for token expiry
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch({ type: actionType.LOGOUT });

                navigate("/", { replace: true });

                setUser(null);
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, []);

    return (
        <Container>
            <Nav>
                <a href="/">
                    <img src="/images/expenseTrackerLogo.png" alt="logo" />
                </a>
                <div>
                    <SignIn onClick={signin}>
                        Sign In
                    </SignIn>
                </div>
            </Nav>
            <Section>
                <Welcome>
                    <h1>
                        Welcome to Expense Tracker
                    </h1>

                </Welcome>
                <img className="bg" src="/images/backgroundImg.jpeg" alt="" />
            </Section>
        </Container>

    );
};


//styled components
const Container = styled.div`
    margin-top: 10px;
    padding:0px;

    &:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0.25;
    background-image: url(${image});
    background-repeat: no-repeat;
    background-position: 50% 0;
    -ms-background-size: cover;
    -o-background-size: cover;
    -moz-background-size: cover;
    -webkit-background-size: cover;
    background-size: cover;
    }
`;
const Nav = styled.nav`
    max-width: 1420px;
    margin: auto;
    z-index: 2;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    flex-wrap: nowrap;

    & > a {
        width: 135px;
        height: 34px;
    }
`;

const SignIn = styled.a`
    box-shadow: inset 0 0 0 1px #0a0a0a;
    color: #0a0a0a;
    border-radius: 24px;
    transition-duration: 167ms;
    font-size: 16px;
    font-weight: 600;
    line-height: 40px;
    padding: 10px 24px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0);
    z-index: 2;
    &:hover {
        background-color: rgba(0, 0, 0, 0.20);
        color: rgba(0, 0, 0);
        text-decoration: none;
    }
`;

const Section = styled.section`
    display: flex;
    align-content: start;
    min-height: 700px;
    padding-bottom: 138px;
    padding-top: 40px;
    padding: 60px 0;
    position: relative;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1320px;
    align-items: center;
    margin: auto;
    z-index: 2;

    .bg {
        width: 90%;
        height: 470px;
        padding-left: 230px;
    }
`;

const Welcome = styled.div`
    width: 100%;
    z-index: 2;
    h1 {
        padding-bottom: 0;
        padding-left: 430px;
        width: 100%;
        font-size: 40px;
        color: #0a0a0a;
        font-weight: 200;
        line-height: 70px;
        @media (max-width: 768px) {
            text-align: center;
            font-size: 20px;
            width: 100%;
            line-height: 2;
        }
    }

    

`;



export default Login;