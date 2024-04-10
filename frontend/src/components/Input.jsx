function Input({children, inputType}) {
    return(
        <form className="my-5 grid w-4/5">
            <label>{children}</label>
            <input type={inputType}></input>
        </form>
    )
}

export default Input;