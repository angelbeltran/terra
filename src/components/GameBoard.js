import React, { Component } from 'react';
import PropTypes from 'prop-types'

import villageBlackImg from '../img/village_black.png'
import tradePostBlackImg from '../img/tradepost_black.png'
import templeBlackImg from '../img/temple_black.png'
import strongholdImg from '../img/stronghold_black.png'
import sanctuaryImg from '../img/sanctuary_black.png'


const img = {
  black: {
    village: villageBlackImg,
    tradePost: tradePostBlackImg,
    temple: templeBlackImg,
    stronghold: strongholdImg,
    sanctuary: sanctuaryImg,
  },
}


// 1370 x 916, ratio of board
export default class GameBoard extends Component {
  static propTypes = {
    boardImg: PropTypes.string.isRequired,
    onTrackClick: PropTypes.func.isRequired,
    // 0..5 -> bonus cards
    onBonusCardClick: PropTypes.func.isRequired,
    // f(row, column)
    onGridClick: PropTypes.func.isRequired,
    // 0..5 -> power bonus spaces
    onPowerBonusClick: PropTypes.func.isRequired,
    // where the buildings are placed
    buildingPlacement: PropTypes.object.isRequired,
    // when a thing is placed on the board
    onGridDrop: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          position: 'relative',
          height: 0,
          paddingTop: ((916 / 1370) * 100) + '%', // 1370 x 916, ratio of board
          backgroundImage: `url(${this.props.boardImg})`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0.95%',
            bottom: '1.3%',
            left: '0.8%',
            right: '0.8%',
          }}
        >

          {/* Everything but the bottom */}
          {/* Left column */}

          {/* Top left corner */}
          <div
            style={{
              position: 'absolute',
              top: '0%',
              left: '0%',
              width: '18.7%',
              height: '9%',
            }}
          >
            <TopLeftScoreTrack
              onTrackClick={this.props.onTrackClick}
            />
          </div>

          {/* Left side of track */}
          <div
            style={{
              position: 'absolute',
              top: '8.8%',
              left: '0%',
              width: '5%',
              height: '86.5%',
            }}
          >
            <LeftScoreTrack
              onTrackClick={this.props.onTrackClick}
            />
          </div>

          {/* Bonus cards */}
          <div
            style={{
              position: 'absolute',
              top: '44%',
              left: '5.8%',
              width: '9.2%',
              height: '49.7%',
            }}
          >
            <BonusCards
              onBonusCardClick={this.props.onBonusCardClick}
            />
          </div>

          {/* Top row of score board */}
          <div
            style={{
              position: 'absolute',
              left: '18.7%',
              width: '78%',
              height: '5%',
            }}
          >
            <TopScoreTrack
              onTrackClick={this.props.onTrackClick}
            />
          </div>

          {/* Map */}
          <div
            style={{
              position: 'absolute',
              top: '10.2%',
              left: '16.8%',
              width: '78.11%',
              height: '73.23%',
            }}
          >
            <Board
              handleGridClick={this.props.onGridClick}
              buildingPlacement={this.props.buildingPlacement}
              onDrop={this.props.onGridDrop}
            />
          </div>

          {/* Power Bonuses */}
          <div
            style={{
              position: 'absolute',
              top: '87.2%',
              left: '22.2%',
              width: '72.54%',
              height: '5.5%',
            }}
          >
            <PowerBonuses
              onPowerBonusClick={this.props.onPowerBonusClick}
            />
          </div>

          {/* Right side of score track */}
          <div
            style={{
              position: 'absolute',
              top: '0%',
              right: '0%',
              bottom: '0%',
              width: '3.4%',
              height: '95.5%',
            }}
          >
            <RightScoreTrack
              onTrackClick={this.props.onTrackClick}
            />
          </div>

          {/* Bottom score row */}
          <div
            style={{
              position: 'absolute',
              bottom: '0%',
              left: '0%',
              right: '0%',
              height: '4.8%',
            }}
          >
            <BottomScoreTrack
              onTrackClick={this.props.onTrackClick}
            />
          </div>
        </div>
      </div>
    )
  }
}

class TopLeftScoreTrack extends Component {
  static propTypes = {
    onTrackClick: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div style={{ display: 'flex', height: '100%', }}>
        {/* Top left square, 20 pts */}
        <div
          style={{ width: '40%', }}
          onClick={() => this.props.onTrackClick(20)}
        >
        </div>
        <div style={{ width: '33%', display: 'column', }}>
          {/* 21 pts */}
          <div
            value={21}
            style={{ height: '82%', }}
            onClick={() => this.props.onTrackClick(21)}
          >
          </div>
        </div>
        <div style={{ width: '27%' }}>
          {/* 22 pts */}
          <div
            value={22}
            style={{ height: '65%', }}
            onClick={() => this.props.onTrackClick(22)}
          >
          </div>
        </div>
      </div>
    )
  }
}

class TopScoreTrack extends Component {
  static propTypes = {
    onTrackClick: PropTypes.func.isRequired,
  }

  render() {
    const smallBoxes = []
    for (let i = 0; i < 25; i++) {
      smallBoxes.push(
        <div
          key={24 + i}
          style={{ width: `${100 / 25}%` }}
          onClick={() => this.props.onTrackClick(24 + i)}
        >
        </div>
      )
    }

    return (
      <div style={{ width: '100%', height: '100%', display: 'flex' }}>
        <div
          style={{ width: '5%', height: '122%' }}
          onClick={() => this.props.onTrackClick(23)}
        >
        </div>
        {smallBoxes}
      </div>
    )
  }
}

class RightScoreTrack extends Component {
  static propTypes = {
    onTrackClick: PropTypes.func.isRequired,
  }

  render() {
    const pointOffset = 49
    const numBoxes = 21
    const smallBoxes = []
    for (let i = 0; i < numBoxes; i++) {
      smallBoxes.push(
        <div
          key={pointOffset + i}
          style={{ height: `${100 / numBoxes}%` }}
          onClick={() => this.props.onTrackClick(pointOffset + i)}
        >
        </div>
      )
    }

    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', }}>
        {smallBoxes}
      </div>
    )
  }
}

class BottomScoreTrack extends Component {
  static propTypes = {
    onTrackClick: PropTypes.func.isRequired,
  }

  render() {
    const numBoxes = 32
    const smallBoxes = []

    smallBoxes.push(
      <div
        key={1}
        style={{ width: `${100 / numBoxes}%` }}
        onClick={() => this.props.onTrackClick(1)}
      >
      </div>
    )
    for (let i = 0; i < numBoxes - 1; i++) {
      smallBoxes.push(
        <div
          key={100 - i}
          style={{ width: `${100 / numBoxes}%` }}
          onClick={() => this.props.onTrackClick(100 - i)}
        >
        </div>
      )
    }

    return (
      <div style={{ width: '100%', height: '100%', display: 'flex' }}>
        {smallBoxes}
      </div>
    )
  }
}

class LeftScoreTrack extends Component {
  static propTypes = {
    onTrackClick: PropTypes.func.isRequired,
  }

  render() {
    const boxes = []
    for (let i = 0; i < 15; i++) {
      boxes.push(
        <div
          key={i}
          style={{ height: '6.666666%' }}
          onClick={() => this.props.onTrackClick(16 - i)}
        >
        </div>
      )
    }

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', }}>
        {/* Top 3 squares */}
        <div style={{ height: '22.3%', display: 'flex', flexDirection: 'column', }}>
          {/* 19pt */}
          <div style={{ height: '39%' }} onClick={() => this.props.onTrackClick(19)}>
          </div>
          <div style={{ height: '31%', display: 'flex' }}>
            {/* 18pt */}
            <div style={{ width: '80%' }} onClick={() => this.props.onTrackClick(18)}>
            </div>
          </div>
          <div style={{ height: '30%', display: 'flex' }}>
            {/* 17pt */}
            <div style={{ width: '75%' }} onClick={() => this.props.onTrackClick(17)}>
            </div>
          </div>
        </div>
        {/* The rest */}
        <div style={{ height: '77.7%', display: 'flex', }}>
          <div style={{ width: '66%' }}>
            {boxes}
          </div>
        </div>
      </div>
    )
  }
}

class BonusCards extends Component {
  static propTypes = {
    onBonusCardClick: PropTypes.func.isRequired,
  }

  render() {
    const cards = []
    for (let i = 0; i < 6; i++) {
      cards.push(
        <div
          key={i}
          style={{ height: `${100 / 6}%`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center' }}
        >
          <div
            style={{ height: '88%' }}
            onClick={() => this.props.onBonusCardClick(6 - i)}>
          </div>
        </div>
      )
    }

    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', }}>
        {cards}
      </div>
    )
  }
}

class Board extends Component {
  static propTypes = {
    handleGridClick: PropTypes.func.isRequired,
    buildingPlacement: PropTypes.object.isRequired,
    onDrop: PropTypes.func.isRequired,
  }

  static numRows = 28 // These are specific to the board.
  static numCols = 26 // Potentially, they could be variables/props.

  constructor(props) {
    super(props)
    this.state = {
      x: -1,
      y: -1,
      screenWidth: -1,
      screenHeight: -1,
    }
  }

  componentWillMount = () => {
    this.updateDimensions()
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.updateDimensions, false)
    this.setState({
      x: this.div.offsetLeft,
      y: this.div.offsetTop,
      width: this.div.clientWidth,
      height: this.div.clientHeight,
    })
  }


  componentWillUnmount = () => {
    window.addRemoveListener('resize', this.updateDimensions, false)
  }

  updateDimensions = () => {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    })
  }

  handleClick = (e) => {
    const x = e.pageX - this.state.x
    const y = e.pageY - this.state.y
    const rowHeight = this.state.height / Board.numRows
    const colWidth = this.state.width / Board.numCols
    const row = Math.floor(y / rowHeight)
    const col = Math.floor(x / colWidth)

    let tileRow = 0
    let tileCol = 0
    let undecidedTileRow = false

    if (row > 24) {
      tileRow = 8
    } else if (row > 2) {
      if (row % 3 !== 0) {
        tileRow = Math.floor(row / 3)
      } else {
        tileRow = Math.floor(row / 3)
        undecidedTileRow = true
      }
    }
    if (col >= Board.numCols - 1) {
      tileCol = 24
    } else if (col > 0) {
      tileCol = col
      if (!undecidedTileRow) {
        tileCol = col - ((tileRow + col) % 2)
      } else {
        tileCol = col
      }
    }

    if (undecidedTileRow) {
      const positiveSlope = Boolean((col + Math.floor(row / 3)) % 2)

      const x0 = x - (col*colWidth)
      const x1 = 0
      const x2 = colWidth
      const y0 = y - (row*rowHeight)
      const y1 = positiveSlope ? 0 : rowHeight
      const y2 = positiveSlope ? rowHeight : 0

      const above = (x2 - x1)*y0 - (y2 - y1)*x0 > y1*x2 - x1*y2

      if (!above) {
        tileRow -= 1
        if (!positiveSlope) {
          tileCol -= 1
        }
      } else if (positiveSlope) {
        tileCol -= 1
      }
    }

    this.props.handleGridClick(tileRow, tileCol)
  }

  /*
   * w3 schools states @ https://www.w3schools.com/html/html5_draganddrop.asp:
   * The ondragover event specifies where the dragged data can be dropped.
   *
   * By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element.
   *
   * This is done by calling the event.preventDefault() method for the ondragover event
   */
  handleDragOver = (e) => {
    e.preventDefault()
  }

  handleDrop = (row, column, e) => {
    e.preventDefault()

    const data = e.dataTransfer.getData('application/json')

    if (data) {
      try {
        const parsedData = JSON.parse(data)
        this.props.onDrop(row, column, parsedData)
        console.log('parsedData:', parsedData)
      } catch (err) {
        console.error(err)
      }
    }
  }

  getGrid = () => {
    if (!this.state.height || !this.state.width) {
      return // better to dispay nothing than a skewed grid
    }

    const rows = []
    const rowHeight = 2 * this.state.height / Board.numRows
    const borderWidth = 0.3 // %
    for (let i = 0; i < (Board.numRows / 3) - 1; i += 1) {
      const spaces = []
      const numCols = (Board.numCols / 2) - (i % 2)
      for (let j = 0; j < numCols; j += 1) {
        let childImg

        if (this.props.buildingPlacement[i] && this.props.buildingPlacement[i][j]) {
          const type = this.props.buildingPlacement[i][j]

          childImg = img.black[type]
        }

        spaces.push(
          <div
            key={j}
            style={{
              width: `${100 / (Board.numCols / 2)}%`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onDragOver={this.handleDragOver}
            onDrop={(e) => this.handleDrop(i, j, e)}
          >
            {childImg &&
              <img
                src={childImg}
                alt=""
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            }
          </div>
        )
      }
      rows.push(
        <div
          key={i}
          style={{
            height: rowHeight,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: `${100 - borderWidth}%`,
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {spaces}
          </div>
        </div>
      )
    }

    return rows
  }

  render() {
    const boardStyle = {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }
    const innerBodyStyle = {
      width: '100%',
      height: `${100 * (Board.numRows - 2) / Board.numRows}%`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }

    return (
      <div
        ref={(div) => { this.div = div; }}
        onClick={this.handleClick}
        style={boardStyle}
      >
        <div style={innerBodyStyle}>
          {this.getGrid()}
        </div>
      </div>
    )
  }
}

class PowerBonuses extends Component {
  static propTypes = {
    onPowerBonusClick: PropTypes.func.isRequired,
  }

  render() {
    const actionSpaces = []
    for (let i = 1; i <= 6; i++) {
      actionSpaces.push(
        <div
          key={i}
          style={{ width: '5%' }}
          onClick={() => this.props.onPowerBonusClick(i)}>
        </div>
      )
    }

    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between' }}>
        {actionSpaces}
      </div>
    )
  }
}
