import {React, useState , useEffect } from 'react' ;
import { useParams } from 'react-router-dom';

import { TeamDetailCard } from '../components/TeamDetailCard';
import { YearSelector } from '../components/YearSelector';

import './MatchPage.scss' ;

export const MatchPage = () => {

    const [matches , setMatches] = useState( [] ) ;

    // const teamNames = "Royal Challengers Bangalore" ;
    // const year = 2016 ;
    const {teamName, year} = useParams() ;
  
    useEffect (

        () => {
            const fetchMatchesByDates = async () => {
                //  const response = await fetch( `http://localhost:8080/team/${teamNames}/matches?year=${year}`) ;

                 const response = await fetch( `http://localhost:8080/team/${teamName}/matches?year=${year}`) ;
                const data = await response.json() ;
                console.log(data) ;
                setMatches(data);
            } ;
            fetchMatchesByDates();
        } ,[teamName,year]
    );
        if( !{year} ){
        return <h1>Matches Not found!!!!!!!! </h1>
    }

    return (
        <div className='MatchPage'>
            <div className='year-selector'>
                <YearSelector teamName={teamName} />
            </div>
            <div>
            < h1 className='page-heading'>{teamName} Matches in {year}</h1>
            {
                matches.map( match => <TeamDetailCard key = {match.id} teamName = {teamName} match = {match} /> )
            }
            </div>
        </div>
        
    );
}