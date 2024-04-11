function ConfirmButton({children, onClick}) {
    return (
        <button className="bg-slate-950 hover:bg-slate-700 text-white font-semibold py-2 px-4 w-4/5 mt-6 mb-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={onClick}>
            {children}
        </button>
    )
}

export default ConfirmButton;