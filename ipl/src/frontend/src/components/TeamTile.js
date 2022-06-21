import React from 'react'

import './TeamTile.scss' ;

export const TeamTile = ( {teamName}) => {


  return (
    <div className='TeamTile'>
        <h1>{teamName}</h1>
    </div>
  )
}
