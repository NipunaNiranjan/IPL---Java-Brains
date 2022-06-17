package com.example.ipl.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;

import java.util.List;



/* In Match class, we store data from CSV file with some modifications(processes)
 * Now, according user requirements we can define other tables.
 * for ou UI we need to display team matches summery and pie chart about winnings.
 * so, according those requirements we can create this team table, using only view fields from Match table.
 */
@Entity
public class Team {

    /*
     * A different object with the same identifier value was already
     * associated
     * with the session
     * when we save values, we need to tell the IDENTIFY method
     */

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) 
    private long id;
    private String teamName;
    private long totalMatches;
    private long totalwins;

    // tel JPA dont consider this as a db entity
    @Transient
    private List<Match> matches;
    //--we use this to populate all match details of a team

    public List<Match> getMatches() {
        return matches;
    }

    public void setMatches(List<Match> matches) {
        this.matches = matches;
    }

    // constructor for JPA query mapping----------------------
    public Team(String teamName, long totalMatches) {
        this.teamName = teamName;
        this.totalMatches = totalMatches;
    }
    
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getTeamName() {
        return teamName;
    }
    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }
    public long getTotalMatches() {
        return totalMatches;
    }
    public void setTotalMatches(long totalMatches) {
        this.totalMatches = totalMatches;
    }
    public long getTotalwins() {
        return totalwins;
    }
    public void setTotalwins(long totalwins) {
        this.totalwins = totalwins;
    }

    // if we return a TEAM object, it will be look like below 
    @Override
    public String toString() {
        return "Team [teamName=" + teamName + ", totalMatches=" + totalMatches + ", totalwins=" + totalwins + "]";
    }

    public Team() {
    }

    

    

    
    
    

}
