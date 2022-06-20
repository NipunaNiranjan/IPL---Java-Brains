import {React, useState , useEffect } from 'react' ;

import { TeamDetailCard } from '../components/TeamDetailCard';


export const MatchPage = () => {

    const [matches , setMatches] = useState( [] ) ;

    const teamNames = "Royal Challengers Bangalore" ;

    useEffect (

        () => {
            const fetchMatchesByDates = async () => {
                const response = await fetch( `http://localhost:8080/team/${teamNames}/matches?year=2016`) ;
                const data = await response.json() ;
                console.log(data) ;
                setMatches(data);
            } ;
            fetchMatchesByDates();
        } ,[]
    );


    return (
        <div className='MatchPage'>
            <h1>This is {teamNames} Match page</h1>
            {
                matches.map( match => <TeamDetailCard teamName = {teamNames} match = {match} /> )
            }
        </div>
        
    );
}