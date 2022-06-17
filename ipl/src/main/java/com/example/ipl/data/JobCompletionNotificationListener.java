package com.example.ipl.data;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.example.ipl.model.Match;
import com.example.ipl.model.Team;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

  private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);
  /*
   * Java Database Connectivity is an application programming interface for the
   * programming language Java, which defines how a client may access a database.
   * It is a Java-based data access technology used for Java database
   * connectivity. It is part of the Java Standard Edition platform, from Oracle
   * Corporation
   */

  // private final JdbcTemplate jdbcTemplate;
  private final EntityManager em; // ------------------------Entity manager

  // inject JDBC templates
  // @Autowired
  // public JobCompletionNotificationListener(JdbcTemplate jdbcTemplate) {
  // this.jdbcTemplate = jdbcTemplate;
  // }

  // ----------------wee can use JPA for actual data representation--------
  @Autowired
  public JobCompletionNotificationListener(EntityManager em) {
    this.em = em;
  }

  @Override
  // run after the JOb is completed, take the execution job to find out whether the job is done
  @Transactional 
  //since we use shared Entity manager , spring commits this method before running
  public void afterJob(JobExecution jobExecution) {

    if(jobExecution.getStatus() == BatchStatus.COMPLETED) { // if the job is completed

      log.info("!!! JOB FINISHED! Time to verify the results");

      // using JDBC templates we print some of our data
      // jdbcTemplate.query("SELECT team1, team2, date FROM match",
      //   (rs, row) -> "Team 1: " + rs.getString(1) +" Team 2: " + rs.getString(2) + " Date: " +rs.getString(3)
      // ).forEach(str -> System.out.println(str));

      Map<String, Team> teamData = new HashMap<>() ; // to make a lookup table for other purposes

      //----------allow to create jpa query--------
      /* we need to get distinct TEAM names and their count for our task from team1 column ------ */
      em.createQuery("select m.team1 , count(*) from Match m group by m.team1", Object[].class)
        .getResultList() // list of objects
        .stream()
        .map( e -> new Team((String)e[0], (long)e[1])) // mapping the results from Match object to Team object, line by line of the query result list
        .forEach(team -> teamData.put(team.getTeamName(), team)); // add data to our lookup table HASH table

        /* team1 has first batting teams' data and second batting teams is in team2 
         * so , still we want to find the total number of matches played by each team
        */

        em.createQuery("select m.team2 , count(*) from Match m group by m.team2", Object[].class)
          .getResultList()
          .stream()
          .forEach( e -> { // assuming at least one time , every team has batted fist
              // here team var is a reference var not a new object
              Team team = teamData.get((String)e[0]); // returning team OBJECTs from HASH MAP, assign the reference to a TEAM reference variable
              team.setTotalMatches(team.getTotalMatches() + (long)e[1]); // increment total matches played by each team, using the second inning data
          });

          /* now find the total wining times by each team */

          em.createQuery("select m.matchWinner , count(*) from Match m group by m.matchWinner" , Object[].class)
          .getResultList()
          .stream()
          .forEach( e -> {
              Team team = teamData.get((String)e[0]); // returning team OBJECTs from HASH MAP, assign the reference
                                                         // to a TEAM reference variable
              if(team != null) // since there may be NO RESULT matches
                team.setTotalwins((long)e[1]);
          } );

          teamData.values().forEach( team -> em.persist(team)); /*
                                                                * applied to an entity X are as follows: If X is a new
                                                                * entity, it becomes managed. The entity X will be
                                                                * entered into the database at or before transaction
                                                                * commit or as a result of the flush operation. If X is
                                                                * a preexisting managed entity, it is ignored by the
                                                                * persist operation.
                                                                */

          //print team
          // you need to create TO-STRING in team entity
          teamData.values().forEach(team -> System.out.println(team));

          /* ------------------now we have the data to generate APIs to design PIE charts in frontend---------------------- */
    }
  }
}