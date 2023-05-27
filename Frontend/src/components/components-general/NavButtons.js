import React from 'react'
import { NavLink } from 'react-router-dom'
import Section from '../components-general/Section'
import { appRoutes } from './appRoutes'

export default function NavButtons() {
  return (
    <Section>{appRoutes.map(({path})=>(
        <button key={path}><NavLink to={path}>{path}</NavLink></button>
    ))
        }</Section>
  )
}
