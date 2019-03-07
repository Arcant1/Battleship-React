import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import GridItem from './GridItem'
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
  height: 40vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  `
const Grid = styled.div`
  height: 100%;
  width: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid black;
`
const Row = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`
const Grids = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const Playing = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 20px;
`

class GameScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      playerGrid: [
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter'],
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter'],
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter'],
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter'],
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter'],
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter'],
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter'],
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter'],
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter'],
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter']
      ],
      CPUGrid: [
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter'],
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter'],
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter'],
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter'],
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter'],
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter'],
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter'],
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter'],
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter'],
        ['Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter', 'Watter']
      ],
      ships: [
        4, 3, 3, 3, 2
      ],
      playing: 'player',
      status: undefined
    }
  }

  getStatusOfShip (x, y, coords, waterStatus, isPlayer) {
    for (let shipIndex = 0; shipIndex < coords.length; shipIndex++) {
      const ship = coords[shipIndex]
      for (let itemIndex = 0; itemIndex < ship.length; itemIndex++) {
        const item = ship[itemIndex]
        if (item.x === x && item.y === y) {
          if (item.status === 'New' && !isPlayer) {
            return waterStatus
          } else {
            return item.status
          }
        }
      }
    }
    return waterStatus
  }

  updateCoords (x, y, coords, isPlayer) {
    let hitSomething = false
    for (let shipIndex = 0; shipIndex < coords.length; shipIndex++) {
      const ship = coords[shipIndex]
      let countHit = 0
      for (let itemIndex = 0; itemIndex < ship.length; itemIndex++) {
        const item = ship[itemIndex]
        if (item.x === x && item.y === y && item.status === 'New') {
          hitSomething = true
          coords[shipIndex][itemIndex].status = 'Hit'
        }
        if (item.status === 'Hit') {
          countHit++
        }
      }
      if (countHit === ship.length) {
        for (let itemIndex = 0; itemIndex < ship.length; itemIndex++) {
          coords[shipIndex][itemIndex].status = 'Destroy'
        }
        this.checkIfWin(coords, isPlayer)
      }
    }
    if (!hitSomething) {
      let grid = isPlayer ? this.state.CPUGrid : this.state.playerGrid
      grid[y][x] = 'Miss'
      if (isPlayer) {
        this.setState({ CPUGrid: grid })
      } else {
        this.setState({ playerGrid: grid })
      }
    }
    return coords
  }

  checkIfWin (coords, isPlayer) {
    for (let shipIndex = 0; shipIndex < coords.length; shipIndex++) {
      const ship = coords[shipIndex]
      for (let itemIndex = 0; itemIndex < ship.length; itemIndex++) {
        const item = ship[itemIndex]
        if (item.status === 'New') {
          return
        }
      }
    }
    if (isPlayer) {
      this.setState({ status: 'Win' })
    } else {
      this.setState({ status: 'Lose' })
    }
  }

  renderGridItem (x, y, coords, waterStatus, isPlayer) {
    const status = this.getStatusOfShip(x, y, coords, waterStatus, isPlayer)
    return (
      <GridItem
        key={x}
        isPlayer={isPlayer}
        status={status}
        onClick={() => {
          this.setState({
            enemyCoords: this.updateCoords(x, y, coords, true),
            playing: 'CPU'
          })
        }}
      />
    )
  }

  randomIntFromInterval (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  generateEnemyShips (ships) {
    let enemyCoords = []
    // almaceno los barcos
    for (let i = 0; i < ships.length; i++) {
      // genero posicion random inicial
      let dir = Math.random() > 0.5 ? 'V' : 'H'
      let xInitial = this.randomIntFromInterval(0, dir === 'H' ? (9 - ships[i]) : 9)
      let yInitial = this.randomIntFromInterval(0, dir === 'V' ? (9 - ships[i]) : 9)

      let coord = []
      for (let c = 0; c < ships[i]; c++) {
        coord.push({
          x: dir === 'H' ? xInitial + c : xInitial,
          y: dir === 'V' ? yInitial + c : yInitial,
          status: 'New'
        })
      }
      // mientras no sea valida la posicion sigo generando
      while (!this.isValid(enemyCoords, coord)) {
        // genero posicion random inicial
        dir = Math.random() > 0.5 ? 'V' : 'H'
        xInitial = this.randomIntFromInterval(0, dir === 'H' ? (9 - ships[i] + 1) : 9)
        yInitial = this.randomIntFromInterval(0, dir === 'V' ? (9 - ships[i] + 1) : 9)

        coord = []
        for (let c = 0; c < ships[i]; c++) {
          coord.push({
            x: dir === 'H' ? xInitial + c : xInitial,
            y: dir === 'V' ? yInitial + c : yInitial,
            status: 'New'
          })
        }
      }
      enemyCoords.push(coord) // la posicion es valida, agrego las coordenadas
    }
    return enemyCoords
  }

  isValid (enemyCoords, coord) {
    for (let i = 0; i < coord.length - 1; i++) { // verifico cada pedazo de mi barco
      let item = coord[i]

      for (let shipIndex = 0; shipIndex < enemyCoords.length; shipIndex++) {
        const enemyShip = enemyCoords[shipIndex]
        for (let itemIndex = 0; itemIndex < enemyShip.length; itemIndex++) {
          const enemyItem = enemyShip[itemIndex]
          if (enemyItem.x === item.x && enemyItem.y === item.y) return false
        }
      }
    }
    return true
  }

  componentWillMount () {
    this.setState({
      coords: this.props.location.state.coords,
      enemyCoords: this.generateEnemyShips(this.state.ships)
    })
  }

  render () {
    const { playerGrid, CPUGrid, playing, coords, enemyCoords, status } = this.state

    if (playing === 'CPU') {
      this.setState({
        coords: this.updateCoords(this.randomIntFromInterval(0, 9), this.randomIntFromInterval(0, 9), coords, false),
        playing: 'Player'
      })
    }

    switch (status) {
      case 'Win': this.props.history.push('/end/win'); break
      case 'Lose': this.props.history.push('/end/lose'); break
      default: break
    }

    return (
      <Container>
        <Title>Battleship</Title>
        <Playing>{status}</Playing>
        <Grids>
          <GridContainer className='marginRight20'>
            <Paper className='PaperGrid' elevation={4}>
              <Grid>
                {playerGrid.map(
                  (row, y) =>
                    <Row key={y}>
                      {row.map((waterStatus, x) => this.renderGridItem(x, y, coords, waterStatus, true))}
                    </Row>
                )}
              </Grid>
            </Paper>
          </GridContainer>
          <GridContainer>
            <Paper className='PaperGrid' elevation={4}>
              <Grid>
                {CPUGrid.map(
                  (row, y) =>
                    <Row key={y}>
                      {row.map((waterStatus, x) => this.renderGridItem(x, y, enemyCoords, waterStatus, false))}
                    </Row>
                )}
              </Grid>
            </Paper>
          </GridContainer>
        </Grids>
        <Button color='primary' className='ButtonGame' component={Link} to='/end/surrender'>
          Surrender
        </Button>
      </Container>
    )
  }
}

export default GameScreen
