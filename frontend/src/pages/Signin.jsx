import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import Input from "../components/Input";
import ConfirmButton from "../components/ConfirmButton";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div>
            <div className="h-screen flex w-1/4 m-auto">
            <div className="flex flex-col justify-center items-center rounded-lg h-7/12 my-auto bg-slate-300 p-4">
                <Header>Sign In</Header>
                <SubHeader>Enter your credentials to access your account</SubHeader>
                <Input inputType={"email"} onChange={(e)=>setEmail(e.target.value)}>Email</Input>
                <Input inputType={"password"} onChange={(e)=>setPassword(e.target.value)}>Password</Input>
                <ConfirmButton onClick={async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                        username: email,
                        password: password
                    });
                    console.log(response);
                    localStorage.setItem("token", response.data.token)
                    navigate("/dashboard");
                }}>Sign In</ConfirmButton>
                <BottomWarning text={"Don't have an account?"} link={"Sign Up"} to={"/signup"}></BottomWarning>
            </div>
        </div>
        </div>
    )
}

export default Signin;