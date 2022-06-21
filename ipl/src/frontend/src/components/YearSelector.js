import { React } from 'react';
import { Link } from 'react-router-dom';

import './YearSelector.scss';

export const YearSelector = ({teamName}) => {
    
    let years = []; // when displaying some list of things, first create a list
    // const startYear = process.env.REACT_APP_DATA_START_YEAR;
    // const endYear = process.env.REACT_APP_DATA_END_YEAR;
    const startYear = 2008;
    const endYear = 2020;

    for (let i = startYear; i <= endYear; i++ ) {
        years.push(i);
    }


    return (
        <ol className="YearSelector">
        { years.map(year => (
            <li key={year}>
                {/* react router links */}
                <Link to={`/teams/${teamName}/matches/${year}`}>{year}</Link>
            </li>
        )) }
        </ol>
    )

}