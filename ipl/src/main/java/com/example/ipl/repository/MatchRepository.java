package com.example.ipl.repository;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.example.ipl.model.Match;

import java.util.List;

public interface MatchRepository extends CrudRepository<Match, Long> {
    
    /*  tell JPA , get all the matches where team1 equals to teamName1 OR team2 equals to teamName2
     * AND Order by the latest date
     * AND only give asking number of pages not at all, otherwise it returns all matches
     */
    // if any two Team column(feild) has searching name, i will return

    List<Match> getByTeam1OrTeam2OrderByDateDesc(String teamName1 , String teamName2 , Pageable pageable);

    //-------create default method inside an interface
    // we don't need any DAO class

    default List<Match> findLatestMatchesByTeam(String teamName , int count ){
        return getByTeam1OrTeam2OrderByDateDesc(teamName, teamName, PageRequest.of(0, count)) ;
    }


}
