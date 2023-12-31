import {Link} from "react-router-dom";
import styled from "styled-components";
import {AiOutlineLock} from "react-icons/ai";
import {BsPerson} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import Cookies from 'js-cookie';
import API_BASE_URL from "../utils/apiConfig";

const Login = () => {
    const [user, setUser] = useState({email: "", password: ""});

    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = user;
        if (!email) {
            toast.error("Please enter your user email!");
            return;
        }
        if (!password) {
            toast.error("Please enter your password!");
            return;
        }
        try {
            const response = await axios.post(
                `${API_BASE_URL}/login`,
                user, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );

            if (response.status >= 200 && response.status < 300) {
                const userData = await response.data;
                // Assuming your server returns the user's id and role
                const id = userData.id;
                const role = userData.role;
                // Store the user ID in a cookie
                Cookies.set('userId', id);
                // Check the user role and redirect accordingly
                if (role === 1) {
                    navigate("/admin/dashboard");
                } else if (role === 2) {
                    navigate("/sales_performance");
                } else {
                    toast.error("Invalid user role!");
                }
            } else {
                // Handle authentication failure
                toast.error("Invalid email or password");
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            toast.error("An error occurred during authentication");
        }
    };

    return (
        <Wrapper>
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <h1> Sales Management System</h1>
                    <div className="icon-container">
            <span className="icon">
              <BsPerson/>
            </span>
                        <input
                            type="text"
                            name="email"
                            placeholder="username"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="icon-container">
            <span className="icon">
              <AiOutlineLock/>
            </span>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={handleChange}
                        />
                        <div className="link-container">
                            <Link to="/forgot_pwd">Forgot Password?</Link>
                        </div>
                    </div>

                    {/* login function need to implement based on the user role (admin or normal user) */}
                    <button type="submit" className="btn">
                        login
                    </button>
                </form>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    display: grid;
    align-items: center;
    justify-content: center;
    height: 100vh;

    form {
        padding: 4rem 0;
        text-align: center;
    }

    .icon-container {
        position: relative;
        width: 75%;
        margin: 1.25rem auto;
    }

    .icon {
        position: absolute;
        left: 0.25rem;
        top: 0.25rem;
        height: 100%;
    }

    h1 {
        margin-bottom: 3rem;
        padding: 0 0.25rem;
    }

    input {
        width: 100%;
        height: 2.25rem;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 1px;
        border: 1px solid;
        border-radius: 0.25rem;
    }

    .link-container {
        text-align: right;
        margin-top: 0.5rem;
    }

    .link-container a {
        color: #ff0404;
        text-align: right;
        text-decoration: underline;
        font-style: italic;
        right: 2rem;
    }

    .btn {
        color: #ffffff;
        padding: 0.5rem 2rem;
        margin-top: 1.25rem;
        background-color: #426b1f;
        font-weight: 600;
        font-size: 0% .75;
        letter-spacing: 1px;
        text-transform: uppercase;
        border: 1px solid;
        border-radius: 0.25rem;
    }

    @media (max-width: 576px) {
        form {
            padding: 4rem 3rem;
        }
    }
`;
export default Login;
