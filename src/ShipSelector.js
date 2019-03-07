import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from 'material-ui'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const Item = styled.div`
  height: 30px;
  width: 30px;
  background-color: ${props => props.selected ? 'orange' : 'grey'};
  border: 1px solid black;
`

class ShipSelector extends Component {
  render () {
    const { onClick, size, selected } = this.props
    return (
      <Button
        className='ShipSelector'
        onClick={onClick}
      >
        <Container>
          {[...Array(size)].map((item, i) =>
            <Item key={i} selected={selected} />
          )}
        </Container>
      </Button>
    )
  }
}

export default ShipSelector
