function Appbar({heading, firstName}) {
    return (
        <div className="flex justify-between bg-slate-200 p-5">
            <div className="font-bold text-3xl px-5">{heading}</div>
            <div className="flex px-5">
                <div className="font-bold text-xl px-2">Hello, {firstName}</div>
                <div className="text-xl px-2 bg-slate-400 h-7 w-7 rounded-full">{firstName[0]}</div>
            </div>
        </div>
    )
}

export default Appbar;