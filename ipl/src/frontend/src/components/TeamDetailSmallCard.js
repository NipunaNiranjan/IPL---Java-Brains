import {React} from 'react';
import { Link } from 'react-router-dom'; 
// https://v5.reactrouter.com/web/api/Link

import './TeamDetailSmallCard.scss' ;

export const TeamDetailSmallCard = ( {teamName ,match} ) => {

  if(!match) return null ;
 const otherTeamName = match.team1 === teamName ? match.team2 : match.team1 ;
const otherTeamNameRoute = `/teams/${otherTeamName}` ; // this is a rout, when ever this rout calls, it can redirect to the backend calling as our TeamPage
 
const isMatchWon = teamName === match.matchWinner ;
 
  return (
    <div className= { isMatchWon ? 'TeamDetailSmallCard won-card' : 'TeamDetailSmallCard lost-card' }>
        {/* <h4> vs {otherTeamName}</h4> */}
        <span className='vs'>vs</span>
        <h4> 
            <Link to={otherTeamNameRoute}>{otherTeamName} </Link>
        </h4> 
        {/* this is a best usecase of routes */}

        <p className='match-result'>{match.matchWinner} won by {match.resultMargin} {match.result}</p>
     
    </div>
  );
}