type ErrorProps = {
    message: string | null
    onDismiss: () => void
}

export const ErrorMessage = ({message, onDismiss} : ErrorProps)=>{
    return(
        <div className="error-message">
            <div className="error-content">
                <span>!</span>
                <span>{message}</span>
            </div>
            {onDismiss && (
                <button className="error-dismis" onClick={onDismiss}>
                Dismiss
                </button>
            )}
        </div>
    )
}