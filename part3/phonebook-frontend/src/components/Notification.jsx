const Notification = ({ message, error }) => {
    console.log("in notification component")
    if(message === null) {
        return null
    }
    if (error) {
        return(
            <div className="error">
                {message}
            </div>
        )
    }
    return (
        <div className="success">
            {message}
        </div>
    )
}

export default Notification