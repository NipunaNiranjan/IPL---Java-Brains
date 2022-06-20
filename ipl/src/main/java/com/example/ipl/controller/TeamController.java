package com.example.ipl.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.domain.PageRequest;
// import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ipl.model.Team;
import com.example.ipl.model.Match;
import com.example.ipl.repository.MatchRepository;
import com.example.ipl.repository.TeamRepository;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin
public class TeamController {

    /*
     * the constructor injection happens at very early stage of Spring Bean
     * initialization, in createBeanInstance method of Bean Factory,
     * while @Autowired -based injection happens way later, on post processing stage
     * and is done by AutowiredAnnotationBeanPostProcessor .
     */
    // @Autowired
    // private TeamRepository teamRepo ;

    private TeamRepository teamRepo ;
    private MatchRepository matchRepo ;

    // since we use this repo for GETMAPPING , we have to use constructor based DI,
    // for POSTMAPPING we can use @Autowired
   

    public TeamController(TeamRepository teamRepo, MatchRepository matchRepo) {
        this.teamRepo = teamRepo;
        this.matchRepo = matchRepo;
    }


    @GetMapping("/team")
    public Iterable<Team> getAllTeam() {
        return this.teamRepo.findAll();
    }
    

    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName){
        // return this.teamRepo.findByTeamName(teamName);

        Team team = this.teamRepo.findByTeamName(teamName);
         
//------------now we have DataDomain Class instance in our controller class, this is not a best practice (not ideal)-------------
        // Pageable pageable = PageRequest.of(0, 4);
// instead of that we can create a method in Match repo for paging

        team.setMatches( matchRepo.findLatestMatchesByTeam( teamName, 4)) ; // set references to all the matches played by the searching team
        // since this is reference to match objects, team object too has all matches details

        return team ; // this team is only a reference var that is referencing to the actual team object
    }

    @GetMapping("/team/{teamName}/matches") // since YEAR is a query param , we don need to specify it in the URL, only in the method
    public List<Match> getMacthesForTeam( @PathVariable String teamName , @RequestParam int year){ // @RequestParam is used for Query
        LocalDate startDate = LocalDate.of(year, 1, 1) ;
        LocalDate endDate = LocalDate.of(year + 1 , 1, 1) ;
    //    return this.matchRepo.getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(
    //             teamName,
    //             startDate,
    //             endDate,
    //              teamName, 
    //              startDate, 
    //              endDate); 


        return this.matchRepo.getMatchesByTeamBetweenDates(teamName, startDate, endDate) ;
    }
}
