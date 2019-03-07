import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import GridItem from './GridItem'
import ShipSelector from './ShipSelector'
import { Button, Paper } from 'material-ui'

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  height: 100%;
`
const Title = styled.h1`
  font-family: 'Noto Sans', sans-serif;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`
const GridContainer = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`
const Grid = styled.div`
  height: 100%;
  width: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid black;
`
const Selector = styled.div`
  display: flex; 
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  margin-right: 20px;
  border: 1px solid black;
`
const Row = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`

class StartScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      grid: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      ships: [
        4, 3, 3, 3, 2
      ],
      shipSelected: 0,
      coords: []
    }
  }

  getStatusOfShip (x, y, coords) {
    for (let shipIndex = 0; shipIndex < coords.length; shipIndex++) {
      const ship = coords[shipIndex]
      for (let itemIndex = 0; itemIndex < ship.length; itemIndex++) {
        const enemyItem = ship[itemIndex]
        if (enemyItem.x === x && enemyItem.y === y) return 1
      }
    }
    return 0
  }

  renderGridItem (x, y, coords) {
    const status = this.getStatusOfShip(x, y, coords)
    return (
      <GridItem key={x} ship={status} onClick={() => this.setShip(x, y, status)} />
    )
  }

  setShip (x, y, marked) {
    const { shipSelected, ships, coords } = this.state
    const size = ships[shipSelected]
    let coord = []
    let dir = 'H'

    if ((x + size - 1) > 9) return

    for (let i = 0; i < size; i++) {
      coord.push({
        x: dir === 'H' ? x + i : x,
        y: dir === 'V' ? y + i : y,
        status: 'New'
      })
    }
    if (this.isValid(coords, coord)) {
      ships.splice(shipSelected, 1)
      coords.push(coord)
      this.setState({ coords, ships })
    }
  }

  isValid (coords, coord) {
    for (let i = 0; i < coord.length - 1; i++) { // verifico cada pedazo de mi barco
      let item = coord[i]

      for (let shipIndex = 0; shipIndex < coords.length; shipIndex++) {
        const enemyShip = coords[shipIndex]
        for (let itemIndex = 0; itemIndex < enemyShip.length; itemIndex++) {
          const enemyItem = enemyShip[itemIndex]
          if (enemyItem.x === item.x && enemyItem.y === item.y) return false
        }
      }
    }
    return true
  }

  render () {
    const { grid, ships, shipSelected, coords } = this.state
    return (
      <Container>
        <Title>Battleship</Title>
        <GridContainer>
          <Selector>
            {ships.map((size, i) =>
              <ShipSelector
                key={i}
                size={size}
                onClick={() => this.setState({ shipSelected: i })}
                selected={shipSelected === i}
              />
            )}
          </Selector>
          <Paper className='PaperGrid' elevation={4}>
            <Grid>
              {grid.map(
                (row, y) =>
                  <Row key={y}>
                    {row.map((item, x) => this.renderGridItem(x, y, coords))}
                  </Row>
              )}
            </Grid>
          </Paper>
        </GridContainer>
        <Button
          variant='raised'
          color='primary'
          className='ButtonStart'
          disabled={ships.length > 0}
          component={Link}
          to={{
            pathname: '/game',
            state: { coords }
          }}
        >
          Start Game
        </Button>
      </Container>
    )
  }
}

export default StartScreen
