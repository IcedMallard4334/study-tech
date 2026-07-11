//client/src/components/common/Button/Card.jsx

import './Card.css'

//Reusable Card
const Card = ({children, className =""}) => {
    return (  
        <div className={`card ${className}`}>

            {children}

        </div>

    );
}
 
export default Card;