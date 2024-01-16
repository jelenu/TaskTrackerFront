import React from 'react'
import { ListTitle } from './ListTitle'
import { Card } from './Card'
import { AddCardOrList } from './AddCardOrList'

export const List = () => {
  return (
    <div className='w-64 bg-gray-200 rounded-xl m-5 p-4'>
        <ListTitle/>
        <Card/>
        <Card/>
        <Card/>
        <AddCardOrList/>
    </div>
    

  )
}
