const Td = ({ className = "", style = {}, alignLeft = false, children }) => {


    return (
        <td style={{ ...style }} className={`flex flex-grow:1 items-center ${alignLeft ? "justify-start" : "justify-center"}`}>
            <div className={`${className} flex items-center  `}>
                {children}
            </div>
        </td>
    )
}

export default Td;