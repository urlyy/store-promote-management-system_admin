const Td = ({ className = "", alignLeft = false, children }) => {
    return (
        <td>
            <div className={`${className} ${alignLeft ? "justify-start" : "justify-center"} flex items-center flex-1`}>
                {children}
            </div>
        </td>
    )
}

export default Td;