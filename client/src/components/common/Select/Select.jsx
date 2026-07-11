//client/src/components/common/Button/Select.jsx

import './Select.css'

//Reusable select
const Select = ({ label, value, onChange, options}) => {
    return (  
        <div className="select-group">

            <label>

                {label}

            </label>

            <select

                value={value}

                onChange={onChange}

            >

                <option value="">

                    Select...

                </option>

                {

                    options.map(option=>(

                        <option

                            key={option}

                            value={option}

                        >

                            {option}

                        </option>

                    ))

                }

            </select>

        </div>
    );
}
 
export default Select;