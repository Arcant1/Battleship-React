import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from 'material-ui'

class GridItem extends Component {
  render () {
    const { status, isPlayer } = this.props
    return (
      <Button
        disabled={isPlayer}
        variant='raised'
        className={`StartGridItem ${status}`}
        onClick={this.props.onClick}
        color={this.props.ship ? '' : 'primary'}
      ><div /></Button>
    )
  }
}

export default GridItem
