import {React} from 'react';

export const TeamDetailSmallCard = ( {match} ) => {
  return (
    <div className="TeamDetailSmallCard">
        <h4>{match.team1} vs {match.team2}</h4>
     
    </div>
  );
}