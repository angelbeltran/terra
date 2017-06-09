import React, { Component } from 'react';
import PropTypes from 'prop-types'


// 1500 x 1011, ratio of board
export default class GameBoard extends Component {
  static propTypes = {
    boardImg: PropTypes.string.isRequired,
  }

  static TOP_RATIO = 94.9
  static BOTTOM_RATIO = 100 - GameBoard.TOP_RATIO

  static BOARD_STYLE = {
    // backgroundImage: `url(${nomadBoard})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    position: 'relative',
    height: 0,
    paddingTop: ((1011 / 1500) * 100) + '%', // 1500 x 1011, ratio of board
  }

  static BODY_STYLE = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }

  static TOP_STYLE = {
    display: 'flex',
    alignItems: 'stretch',
    height: `${GameBoard.TOP_RATIO}%`,
  }
  static BOTTOM_STYLE = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: `${GameBoard.BOTTOM_RATIO}%`,
  }

  render() {
    const boardStyle = {
      ...GameBoard.BOARD_STYLE,
      backgroundImage: `url(${this.props.boardImg})`,
    }

    return (
      <div style={boardStyle}>
        <div style={GameBoard.BODY_STYLE}>
          {/* Everything but the bottom */}
          <div style={GameBoard.TOP_STYLE}>
            {/* Left column */}
            <div style={{ width: '15.3%', display: 'flex', flexDirection: 'column' }}>
              {/* Top left corner */}
              <div style={{ height: '10%', display: 'flex', }}>
                <div style={{ width: '2%' }}>
                </div>
                <div style={{ width: '98%', display: 'flex', flexDirection: 'column-reverse' }}>
                  <div style={{ height: '94%' }}>
                    <TopLeftScoreTrack />
                  </div>
                </div>
              </div>
              <div style={{ height: '90%', display: 'flex' }}>
                {/* Left side of track */}
                <div style={{ width: '35%' }}>
                  <div style={{ display: 'flex', height: '100%' }}>{/* TODO: can we remove height? */}
                    <div style={{ width: '8%', }}>
                    </div>
                    <div style={{ width: '86%', }}>
                      <LeftScoreTrack />
                    </div>
                  </div>

                </div>
                {/* Bonus cards */}
                <div style={{ width: '65%', display: 'flex' }}>
                  <div style={{ width: '8%' }}>
                  </div>
                  <div style={{ width: '92%' }}>
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ height: '40.8%' }}>
                      </div>
                      <div style={{ height: '58.3%' }}>
                        <BonusCards />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Middle of board */}
            <div style={{ width: '81.3%', display: 'flex', flexDirection: 'column' }}>
              {/* Top row of score board */}
              <div style={{ height: '0.7%' }}>
              </div>
              <div style={{ height: '4.5%' }}>
                <TopScoreTrack />
              </div>
              <div style={{ height: '6%' }}>
              </div>
              {/* Map */}
              <div style={{ height: '77%', display: 'flex' }}>
                <div style={{ width: '2.2%' }}>
                </div>
                <div style={{ width: '95.8%' }}>
                  <Board />
                </div>
              </div>
              <div style={{ height: '3.9%' }}>
              </div>
              <div style={{ height: '5.7%', display: 'flex', }}>
                <div style={{ width: '9%' }}>
                </div>
                {/* Power Store */}
                <div style={{ width: '88.6%' }}>
                  <PowerStore />
                </div>
              </div>
            </div>
            {/* Right side of scroe track */}
            <div style={{ width: '3.1%', display: 'flex', }}>
              <div style={{ width: '6%' }}>
              </div>
              <div style={{ width: '91%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '2%' }}>
                </div>
                <div style={{ height: '99%' }}>
                  <RightScoreTrack />
                </div>
              </div>
            </div>
          </div>
          {/* Bottom score row */}
          <div style={GameBoard.BOTTOM_STYLE}>
            <div style={{ height: '80%', width: '99%', }}>
              <BottomScoreTrack />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class TopLeftScoreTrack extends Component {
  render() {
    return (
      <div style={{ display: 'flex', height: '100%', }}>
        {/* Top left square, 20 pts */}
        <div value={20} style={{ width: '40%', }}>
        </div>
        <div style={{ width: '33%', display: 'column', }}>
          {/* 21 pts */}
          <div value={21} style={{ height: '82%', }}>
          </div>
        </div>
        <div style={{ width: '27%' }}>
          {/* 22 pts */}
          <div value={22} style={{ height: '65%', }}>
          </div>
        </div>
      </div>
    )
  }
}

class TopScoreTrack extends Component {
  render() {
    const smallBoxes = []
    for (let i = 0; i < 25; i++) {
      smallBoxes.push(
        <div key={24 + i} value={24 + i} style={{ width: `${100 / 25}%` }}>
        </div>
      )
    }

    return (
      <div style={{ width: '100%', height: '100%', display: 'flex' }}>
        <div style={{ width: '5%', height: '122%' }}>
        </div>
        {smallBoxes}
      </div>
    )
  }
}

class RightScoreTrack extends Component {
  render() {
    const pointOffset = 49
    const numBoxes = 21
    const smallBoxes = []
    for (let i = 0; i < numBoxes; i++) {
      smallBoxes.push(
        <div key={pointOffset + i} value={pointOffset + i} style={{ height: `${100 / numBoxes}%` }}>
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
  render() {
    const numBoxes = 32
    const smallBoxes = []

    smallBoxes.push(
      <div key={1} value={1} style={{ width: `${100 / numBoxes}%` }}>
      </div>
    )
    for (let i = 0; i < numBoxes - 1; i++) {
      smallBoxes.push(
        <div key={100 - i} value={100 - i} style={{ width: `${100 / numBoxes}%` }}>
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
  render() {
    const boxes = []
    for (let i = 0; i < 15; i++) {
      boxes.push(
        <div key={i} value={16 - i} style={{ height: '6.666666%' }}>
        </div>
      )
    }

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', }}>
        {/* Top 3 squares */}
        <div style={{ height: '22.3%', display: 'flex', flexDirection: 'column', }}>
          {/* 19pt */}
          <div value={19} style={{ height: '39%' }}>
          </div>
          <div style={{ height: '31%', display: 'flex' }}>
            {/* 18pt */}
            <div value={18} style={{ width: '80%' }}>
            </div>
          </div>
          <div style={{ height: '30%', display: 'flex' }}>
            {/* 17pt */}
            <div value={17} style={{ width: '75%' }}>
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
          <div value={6 - i} style={{ height: '88%' }}>
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

// TODO
class Board extends Component {
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

    const numRows = 28
    const numCols = 26
    const rowHeight = this.state.height / numRows
    const colWidth = this.state.width / numCols
    const row = Math.floor(y / rowHeight)
    const col = Math.floor(x / colWidth)

    let tileRow = 0
    let tileCol = 0
    let undecidedTileRow = 0
    let undecidedTileCol = 0

    if (row > 24) {
      tileRow = 8
    } else if (row > 2) {
      if (row % 3 !== 0) {
        tileRow = Math.floor(row / 3)
      } else {
        // TODO: test this
        tileRow = Math.floor(row / 3)
        undecidedTileRow = 3 // TODO: why is it this way?
      }
    }
    if (col >= numCols - 1) {
      tileCol = 24
    } else if (col > 0) {
      if (!undecidedTileRow) {
        tileCol = col - ((tileRow + col) % 2)
      } else {
        // TODO: test this
        tileCol = col - ((tileRow + col) % 2)
        undecidedTileCol = col // TODO: why is it this way?
      }
    }

    if (undecidedTileRow) {
       // TODO: RETURN HERE TO COMPLETE
       // get coordinates modded by the rowWidth & colWidth
       // get the direction of the line
       // if negative slope
       //   y > mx + b <=> y - mx > b -> 0
       //   y < mx + b <=> y - mx < b -> -1
       // if positive slope, y 
       //   y > mx + b <=> y - mx > b -> -1
       //   y < mx + b <=> y - mx < b -> 0
       //
       //   y2 - y1 = m(x2 - x1)
       // <=> 
       //   y2 = m(x2 - x1) + y1
       // <=>
       //   y = m(x - x1) + y1
       //     = mx - mx1 + y1
       //     = mx - x1(y2 - y1)/(x2 - x1) + y1
       //     = mx - x1(y2 - y1)/(x2 - x1) + y1(x2 - x1)/(x2 - x1)
       //     = mx + (y1(x2 - x1) - x1(y2 - y1))/(x2 - x1)
       //     = mx + (y1x2 - x1y2)/(x2 - x1)
       // =>  b = (y1x2 - x1y2)/(x2 - x1)

      const positiveSlope = Boolean((col + Math.floor(row / 3)) % 2)
      console.log('positiveSlope:', positiveSlope)

      const x1 = 0
      const x2 = colWidth
      const y1 = positiveSlope ? 0 : rowHeight
      const y2 = positiveSlope ? rowHeight : 0
      const m = (y2 - y1)/(x2 - x1)
      const b = (y1*x2 - x1*y2)/(x2 - x1)
      // let offset
      const colOffset = ((positiveSlope + Boolean(y - m*x > b)) % 2) ? 0 : -1
      //let colOffset
      //if = ((positiveSlope + Boolean(y - m*x > b)) % 2) ? 0 : -1

      tileCol += colOffset

      console.log('colOffset:', colOffset)

      /*
      if (positiveSlope) {
        const y1 = 0
        const y2 = rowHeight
        const m = (y2 - y1)/(x2 - x1)
        offset = (y - m*x > b) ? 0 : -1
      } else {
        const y1 = rowHeight
        const y2 = 0
        const m = (y2 - y1)/(x2 - x1)
        offset = (y - m*x > b) ? -1 : 0
      }
      */
    }

    console.log('tileRow:', tileRow)
    console.log('tileCol:', tileCol)
    console.log('undecidedTileRow:', undecidedTileRow)
    console.log('undecidedTileCol:', undecidedTileCol)
    console.log('-------------------')
  }

  render() {
    return (
      <div
        ref={(div) => { this.div = div; }}
        onClick={this.handleClick}
        style={{ width: '100%', height: '100%' }}
      >
      </div>
    )
  }
}

class PowerStore extends Component {
  render() {
    const actionSpaces = []
    for (let i = 0; i < 6; i++) {
      actionSpaces.push(
        <div key={i} value={i} style={{ width: '5%' }}>
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
