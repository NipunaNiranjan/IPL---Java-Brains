import {React} from 'react';
import { Link } from 'react-router-dom';

import './TeamDetailCard.scss' ;



export const TeamDetailCard = ( {teamName ,match}) => {

    if (!match) return null ;

    const otherTeamName = match.team1 === teamName ? match.team2 : match.team1 ;
    const otherTeamNameRoute = `/teams/${otherTeamName}` ; // this is a rout, when ever this rout calls, it can redirect to the backend calling as our TeamPage

    // to make details card colors
    const  isMatchWon = teamName === match.matchWinner ;


  return (
    <div className={ isMatchWon ? 'TeamDetailCard won-card' : 'TeamDetailCard lost-card'}>
        <div>
              {/* <h1> vs {otherTeamName}</h1> */}
            <span className='vs'>vs</span> 
            <h1><Link to = {otherTeamNameRoute} > {otherTeamName}</Link>
              </h1>
              <h2 className='match-date'>{match.date}</h2>
              <h3 className='match-venue'>at {match.venue}</h3>
              <h4 className='match-city'>in {match.city}</h4>
              <h3 className='match-result'>{match.matchWinner} won by {match.resultMargin} {match.result}</h3>
        </div>
        <div className='additional-detail'>
            <h3>First Inning </h3>
              <p>{match.team1}</p>
            <h3>Second Inning </h3>
              <p>{match.team2}</p>
            <h3>Man of the match </h3>
              <p>{match.playerOfMatch}</p>
            <h3>Umpires</h3>
              <p>{match.umpire1}, {match.umpire2}</p>
          </div>
        
    </div>
  );
}