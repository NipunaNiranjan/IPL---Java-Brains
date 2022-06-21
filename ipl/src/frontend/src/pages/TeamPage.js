import {React , useEffect , useState} from 'react';
import { useParams , Link } from 'react-router-dom';
import { TeamDetailCard } from '../components/TeamDetailCard';
import { TeamDetailSmallCard } from '../components/TeamDetailSmallCard';

import './TeamPage.scss' ;

import { PieChart } from 'react-minimal-pie-chart';

export const TeamPage = () => {

    // team = state name ,, teamSet = statehook set method
    const [team , teamSet] = useState( { matches: []} ); // States hooks are used to display data in return area
    // useParam gives list of param objects
    
    const {teamName} = useParams();

   

    useEffect(
        () => {
            const fetchTeam = async () => {
                
                const response = await fetch(`http://localhost:8080/team/${teamName}`);
                const data = await response.json();
                console.log(data);
                teamSet(data);

            };
            fetchTeam();
        } , [teamName] // call the hook when teamName is changing (because we have Link page navigationss ),
        // if u only need to lard this page onece, put the array empty here.
    );


    if( !team || !team.teamName){
        return <h1>Team Not found!!!!!!!!</h1>
    }


  return (
    <div className="TeamPage">
        {/* when styling using Grids each column needs to be in a DIV */}
       <div className='team-name-section'> 
       
            <h1 className='team-name'>{team.teamName}</h1>
        </div>
       <div className='win-loss-section'>
            Wins/Losses
            <PieChart
            data={[
                { title: 'Wins', value: team.totalwins, color: '#4da375' },
                { title: 'Losses', value: team.totalMatches , color: '#a34d5d' },
                
            ]}
            />
        </div>
        <div className='match-detail-section'>
            <h3>Latest Match Details...</h3>
    
            <TeamDetailCard teamName = {team.teamName} match = {team.matches[0]} /> 
        </div>
        {/* following smallCard section has individual dives */}
        {team.matches.slice(1).map( match => <TeamDetailSmallCard teamName = {team.teamName} match = {match} />) }
        <div className='more-link'>
            <Link to={`/teams/${teamName}/matches/2020`}>More >></Link>
        
        </div>
    </div>
  );
}
