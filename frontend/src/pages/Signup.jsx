import ConfirmButton from "../components/ConfirmButton";
import Header from "../components/Header";
import Input from "../components/Input";
import SubHeader from "../components/SubHeader"

function SignUp() {
    return(
        <div className="flex flex-col h-screen w-1/4 bg-slate-300 items-center justify-center m-auto p-5 rounded-lg">
            <Header>Sign Up</Header>
            <SubHeader>Enter your information to create an account</SubHeader>
            <Input inputType={"text"}>First Name</Input>
            <Input inputType={"text"}>Last Name</Input>
            <Input inputType={"email"}>Email</Input>
            <Input inputType={"password"}>Password</Input>
            <ConfirmButton onClick={submit}>Sign Up</ConfirmButton>
        </div>
    )
}

function submit() {





    
}

export default SignUp;