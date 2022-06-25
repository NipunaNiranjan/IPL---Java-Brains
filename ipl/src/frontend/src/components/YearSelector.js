import { React } from 'react';
import { Link } from 'react-router-dom';

import './YearSelector.scss';

export const YearSelector = ({teamName}) => {
    
    let years = []; // when displaying some list of things, first create a list
    // const startYear = process.env.REACT_APP_DATA_START_YEAR;
    // const endYear = process.env.REACT_APP_DATA_END_YEAR;
    const startYear = 2008;
    const endYear = 2020;

    for (let i = endYear; i >= startYear; i-- ) {
        years.push(i);
    }


    return (
        <ol className="YearSelector">
            <h4>Select Year</h4>
        { years.map(year => (
            <li key={year}>
                {/* react router links */}
                <Link key = {year} to={`/teams/${teamName}/matches/${year}`}>{year}</Link>
            </li>
        )) }
        </ol>
    )

}