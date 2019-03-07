import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'material-ui'

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  flex-direction: column;
  background-image: url(${props => props.status === 'surrender' ? './surrender.jpg' : ''});
`

class EndScreen extends Component {
  render () {
    console.log(this.props)
    const { status } = this.props.match.params
    return (
      <Container status={status}>
        <h2>Game end</h2>
        <h1>{status}</h1>
        <Button variant='raised' color='primary' className='ButtonEnd' component={Link} to='/'>
          Play again
        </Button>
      </Container>
    )
  }
}

export default EndScreen
