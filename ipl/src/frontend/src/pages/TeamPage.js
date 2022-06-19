import {React , useEffect , useState} from 'react';
import { useParams } from 'react-router-dom';
import { TeamDetailCard } from '../components/TeamDetailCard';
import { TeamDetailSmallCard } from '../components/TeamDetailSmallCard';



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
        <h1>This is  {team.teamName}team page</h1>
        <TeamDetailCard teamName = {team.teamName} match = {team.matches[0]} />
        {team.matches.slice(1).map( match => <TeamDetailSmallCard teamName = {team.teamName} match = {match} />) }
    </div>
  );
}
