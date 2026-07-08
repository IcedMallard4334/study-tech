import './Button.css'

//Reusable Button
const Button = ({children, onClick, type = "button", variant = "primary", disabled = false,}) => {
    return (

        <button

            type={type}

            onClick={onClick}

            disabled={disabled}

            className={`btn ${variant}`}

        >

            {children}

        </button>

    );

}
 
export default Button;