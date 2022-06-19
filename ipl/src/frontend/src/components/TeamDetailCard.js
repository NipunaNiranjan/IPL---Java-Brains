import {React} from 'react';

export const TeamDetailCard = ( {match}) => {

    if (!match) return null ;
  return (
    <div className="TeamDetailCard">
        <h2>Latest Match Details...</h2>
        <h3>{match.team1} vs {match.team2}</h3>
        <h4>At {match.city}</h4>
    </div>
  );
}