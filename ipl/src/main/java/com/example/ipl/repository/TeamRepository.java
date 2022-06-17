package com.example.ipl.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.ipl.model.Team;


public interface TeamRepository extends CrudRepository<Team,Long> {
    
    // since there is only one raw for each corresponding team, only returns one TEAM object
    Team findByTeamName(String teamName);
    
}
