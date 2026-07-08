import "./Input.css";

//Reusable Input
const Input = ({ label, value, onChange, placeholder, type = "text",}) => {
    return (  
        <div className="input-group">

            <label>

                {label}

            </label>

            <input

                type={type}

                value={value}

                placeholder={placeholder}

                onChange={onChange}

            />

        </div>

    );
}
 
export default Input;