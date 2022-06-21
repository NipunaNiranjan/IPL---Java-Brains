import {React , useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import { TeamTile } from '../components/TeamTile';
import './HomePage.scss' ;

export const HomePage = () => {

    // team = state name ,, teamSet = statehook set method
    const [teams , setTeams] = useState( [] ); // States hooks are used to display data in return area
   
    useEffect(
        () => {
            const fetchAllTeams = async () => {
                
                const response = await fetch(`http://localhost:8080/team`);
                const data = await response.json();
                console.log(data);
                setTeams(data);

            };
            fetchAllTeams();
        } , [] // call the hook when teamName is changing (because we have Link page navigationss ),
        // if u only need to lard this page onece, put the array empty here.
    );


   
  return (
    <div className="HomePage">
        {/* when styling using Grids each column needs to be in a DIV */}
       <div className='header-section'> 
       
            <h1 className='app-name'>My IPL DashBoard from 2008-2020</h1>
        </div>
        <div className='team-grid'>
            { 
            
            teams.map( team => <Link to={`/teams/${team.teamName}`}><TeamTile key = { team.id} teamName = {team.teamName} /> </Link>
            )
             
            }
        </div>
    </div>
  );
}
