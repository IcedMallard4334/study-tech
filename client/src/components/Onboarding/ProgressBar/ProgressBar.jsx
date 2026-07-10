import './ProgressBar.css'

const ProgressBar = ({ current, total }) => {
    const percentage = Math.round((current / total) * 100);

    return (

        <div className="progress-wrapper">

            <div className="progress-track">

                <div

                    className="progress-fill"

                    style={{

                        width: `${percentage}%`

                    }}

                />

            </div>

            <p className="progress-text">

                {percentage}% Complete

            </p>

        </div>

    );
}
 
export default ProgressBar;