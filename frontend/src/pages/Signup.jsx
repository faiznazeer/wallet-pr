import { useState } from "react";
import ConfirmButton from "../components/ConfirmButton";
import Header from "../components/Header";
import Input from "../components/Input";
import SubHeader from "../components/SubHeader"
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return(
        <div className="h-screen flex w-1/4 m-auto">
            <div className="flex flex-col justify-center items-center rounded-lg h-3/4 my-auto bg-slate-300 p-4">
                <Header>Sign Up</Header>
                <SubHeader>Enter your information to create an account</SubHeader>
                <Input inputType={"text"} onChange={(e)=>setFirstName(e.target.value)}>First Name</Input>
                <Input inputType={"text"} onChange={(e)=>setLastName(e.target.value)}>Last Name</Input>
                <Input inputType={"email"} onChange={(e)=>setEmail(e.target.value)}>Email</Input>
                <Input inputType={"password"} onChange={(e)=>setPassword(e.target.value)}>Password</Input>
                <ConfirmButton onClick={async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                        username: email,
                        firstName: firstName,
                        lastName: lastName,
                        password: password
                    });
                    localStorage.setItem("token", response.data.token)
                    navigate("/dashboard");
                }}>Sign Up</ConfirmButton>
                <BottomWarning text={"Already have an account?"} link={"Login"} to={"/signin"}></BottomWarning>
            </div>
        </div>
        
    )
}

export default SignUp;