import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui/styles'
import styled from 'styled-components'
import { Paper } from 'material-ui'
import './App.css'

import StartScreen from './StartScreen'
import GameScreen from './GameScreen'
import EndScreen from './EndScreen'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
`

class App extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <Router>
          <Container>
            <Paper className='Card' elevation={4}>
              <Route exact path='/' component={StartScreen} />
              <Route path='/game' component={GameScreen} />
              <Route path='/end/:status' component={EndScreen} />
            </Paper>
          </Container>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
