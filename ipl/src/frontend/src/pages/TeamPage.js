import {React , useEffect} from 'react';

export const TeamPage = () => {

    useEffect(
        () => {
            const fetchTeam = async () => {
                const responce = await fetch('http://localhost:8080/team/Mumbai%20Indians');
                const data = await responce.json();
                console.log(data);

            };
            fetchTeam();
        } , []
    );




  return (
    <div className="App">
        <h1>This is team page</h1>
    </div>
  );
}
