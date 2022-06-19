import {React} from 'react';
import { Link } from 'react-router-dom';

export const TeamDetailCard = ( {teamName ,match}) => {

    if (!match) return null ;

    const otherTeamName = match.team1 === teamName ? match.team2 : match.team1 ;
    const otherTeamNameRoute = `/teams/${otherTeamName}` ; // this is a rout, when ever this rout calls, it can redirect to the backend calling as our TeamPage
 


  return (
    <div className="TeamDetailCard">
        <h2>Latest Match Details...</h2>
        {/* <h1> vs {otherTeamName}</h1> */}
        <h1>vs
          <Link to = {otherTeamNameRoute} > {otherTeamName}</Link>
        </h1>
        <h2>{match.date}</h2>
        <h3>at {match.venue}</h3>
        <h4>in {match.city}</h4>
        <h3>{match.matchWinner} won by {match.resultMargin} {match.result}</h3>
    </div>
  );
}