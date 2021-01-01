import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/counter.css';

const Assumptions: React.FC = () =>{
    return(
        <div className="assumptionsDiv">
            <h4>List of assumptions</h4> 
            <div>
                <ul className="list-group assumptionsList">
                    <li className="list-group-item assumptionsItem">Duplicate words will only show once</li>
                    <li className="list-group-item assumptionsItem">The word count function is case-sensitive</li>
                    <li className="list-group-item assumptionsItem">The search function is case-insensitive</li>
                    <li className="list-group-item assumptionsItem">Only alphanumeric will be counted</li>
                    <li className="list-group-item assumptionsItem">5000 maximum character input</li>
                </ul>
            </div>
        </div>
    )

}

export default Assumptions;