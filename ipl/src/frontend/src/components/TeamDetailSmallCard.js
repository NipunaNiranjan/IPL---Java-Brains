import {React} from 'react';
import { Link } from 'react-router-dom'; 
// https://v5.reactrouter.com/web/api/Link

export const TeamDetailSmallCard = ( {teamName ,match} ) => {

  if(!match) return null ;
 const otherTeamName = match.team1 === teamName ? match.team2 : match.team1 ;
const otherTeamNameRoute = `/teams/${otherTeamName}` ; // this is a rout, when ever this rout calls, it can redirect to the backend calling as our TeamPage
 
 
  return (
    <div className="TeamDetailSmallCard">
        {/* <h4> vs {otherTeamName}</h4> */}
        <h4>vs 
            <Link to={otherTeamNameRoute}>{otherTeamName} </Link>
        </h4> 
        {/* this is a best usecase of routes */}

        <p>{match.matchWinner} won by {match.resultMargin} {match.result}</p>
     
    </div>
  );
}