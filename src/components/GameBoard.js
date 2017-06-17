import React, { Component } from 'react';
import PropTypes from 'prop-types'

import villageBlackImg from '../img/village_black.png'
import tradePostBlackImg from '../img/tradepost_black.png'
import templeBlackImg from '../img/temple_black.png'
import strongholdImg from '../img/stronghold_black.png'
import sanctuaryImg from '../img/sanctuary_black.png'
import trackerImg from '../img/tracker_black.png'


const img = {
  black: {
    village: villageBlackImg,
    tradePost: tradePostBlackImg,
    temple: templeBlackImg,
    stronghold: strongholdImg,
    sanctuary: sanctuaryImg,
  },
}
const colors = {
  red: 'red',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue',
  brown: 'brown',
  gray: 'gray',
  black: 'black',
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
    // positions of score tracking tokens,
    scores: PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.oneOf(
          Object.keys(colors)
        )
      )
    ).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      // x: -1,
      // y: -1,
      width: -1,
      height: -1,
    }

    this.updateDimensions = this.updateDimensions.bind(this)
  }

  /*
  componentWillMount = () => {
    // this.updateDimensions()
  }
  */

  componentDidMount = () => {
    window.addEventListener('resize', this.updateDimensions, false)
    this.setState({
      // x: this.div.offsetLeft,
      // y: this.div.offsetTop,
      width: this.div.clientWidth,
      height: this.div.clientHeight,
    })
  }


  componentWillUnmount = () => {
    window.addRemoveListener('resize', this.updateDimensions, false)
  }

  updateDimensions = () => {
    this.setState({
      // x: this.div.offsetLeft,
      // y: this.div.offsetTop,
      width: this.div.clientWidth,
      height: this.div.clientHeight,
    })
  }

  getScoreTrackTokens = (space) =>
    (this.props.scores[space] || []).map((color, index) =>
      <TrackerImg
        key={color}
        color={color}
        width={`${this.state.width / 60}px`}
      />
    )

  render() {
    return (
      <div
        ref={(div) => { this.div = div; }}
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

          {/* Top left corner */}
          <TrackSquare
            style={{
              position: 'absolute',
              top: '22.1%',
              width: '3.7774%',
            }}
            onClick={() => this.props.onTrackClick(17)}
          >
            {this.getScoreTrackTokens(17)}
          </TrackSquare>

          <TrackSquare
            style={{
              position: 'absolute',
              top: '16.3%',
              width: '3.9644%',
            }}
            onClick={() => this.props.onTrackClick(18)}
          >
            {this.getScoreTrackTokens(18)}
          </TrackSquare>

          <TrackSquare
            style={{
              position: 'absolute',
              top: '8.9%',
              width: '4.8994%',
            }}
            onClick={() => this.props.onTrackClick(19)}
          >
            {this.getScoreTrackTokens(19)}
          </TrackSquare>

          <TrackSquare
            style={{
              position: 'absolute',
              width: '6.0588%',
            }}
            onClick={() => this.props.onTrackClick(20)}
          >
            {this.getScoreTrackTokens(20)}
          </TrackSquare>

          <TrackSquare
            style={{
              position: 'absolute',
              left: '6.0588%',
              width: '4.8994%',
            }}
            onClick={() => this.props.onTrackClick(21)}
          >
            {this.getScoreTrackTokens(21)}
          </TrackSquare>

          <TrackSquare
            style={{
              position: 'absolute',
              left: '10.9582%',
              width: '3.9644%',
            }}
            onClick={() => this.props.onTrackClick(22)}
          >
            {this.getScoreTrackTokens(22)}
          </TrackSquare>

          <TrackSquare
            style={{
              position: 'absolute',
              left: '14.9226%',
              width: '3.7774%',
            }}
            onClick={() => this.props.onTrackClick(23)}
          >
            {this.getScoreTrackTokens(23)}
          </TrackSquare>

          {/* Left side of track */}
          <div
            style={{
              position: 'absolute',
              top: '28%',
              left: '0%',
              width: '3.2%',
              height: '72%',
            }}
          >
            <LeftScoreTrack
              onClick={this.props.onTrackClick}
              getScoreTrackTokens={this.getScoreTrackTokens}
            />
          </div>

          {/* Top row of score board */}
          <div
            style={{
              position: 'absolute',
              left: '18.7%',
              width: '78%',
              height: '4.7%',
            }}
          >
            <TopScoreTrack
              onClick={this.props.onTrackClick}
              getScoreTrackTokens={this.getScoreTrackTokens}
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
              onClick={this.props.onTrackClick}
              getScoreTrackTokens={this.getScoreTrackTokens}
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
              onClick={this.props.onTrackClick}
              getScoreTrackTokens={this.getScoreTrackTokens}
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
        </div>
      </div>
    )
  }
}

class TrackerImg extends Component {
  static propTypes = {
    color: PropTypes.oneOf(Object.keys(colors)),
    // TODO: for now, let's just use percentages.
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    bottom: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    left: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }

  static defaultProps = {
    color: colors.black,
    width: '80%',
    //height: 'auto',
    bottom: '16%',
    left: '10%',
  }

  getImageSrc = () => {
    switch (this.props.color) {
      case colors.black:
      default:
        return trackerImg
    }
  }

  getImageHeight = () => {
    if (this.props.height) {
      return this.props.height
    }

    const imgWidth = this.img && this.img.clientWidth

    if (imgWidth) {
      // const parsedPropsWidth = parseInt(this.props.width.replace(/%$/, ''), 10) / 100
      return imgWidth * (64 / 45) // dimension ratio
    }

    return 0 
    // return 'auto'
  }

  updateImageRef = (img) => {
    if (!this.img) {
      this.img = img
      setTimeout(() => this.forceUpdate())
    }
  }

  render() {
    return (
      <img
        src={this.getImageSrc()}
        alt=""
        ref={this.updateImageRef}
        style={{
          position: 'relative',
          bottom: this.props.bottom,
          // left: this.props.left,
          width: this.props.width,
          height: this.getImageHeight(),
          padding: '1%',
        }}
      />
    )
  }
}

class TrackSquare extends Component {
  static propTypes = {
    style: PropTypes.object,
    tokens: PropTypes.arrayOf(
      PropTypes.oneOf(Object.keys(colors))
    ),
    onClick: PropTypes.func,
  }

  static defaultProps = {
    style: {},
    tokens: [],
  }

  static style = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  }

  updateRef = (div) => {
    if (!this.div) {
      this.div = div
      setTimeout(() => this.forceUpdate())
    }
  }

  getDimensions = () => {
    let dim = `${(this.div && (this.div.clientWidth || this.div.clientHeight)) || 0}px`

    return {
      height: dim,
      width: dim,
    }
  }

  render() {
    return (
      <div
        ref={this.updateRef}
        style={{
          ...TrackSquare.style,
          ...this.getDimensions(),
          ...this.props.style
        }}
        onClick={() => this.props.onClick && this.props.onClick()}
      >
        {this.props.children}
      </div>
    )
  }
}

class LeftScoreTrack extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    getScoreTrackTokens: PropTypes.func.isRequired,
  }

  getSpaces = () => {
    const spaces = []
    for (let i = 0; i < 16; i++) {
      spaces.push(
        <TrackSquare
          key={16 - i}
          style={{
            height: '6.666666%',
          }}
          onClick={() => this.props.onClick(16 - i)}
        >
          {this.props.getScoreTrackTokens(16 - i)}
        </TrackSquare>
      )
    }

    return spaces
  }

  render() {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {this.getSpaces()}
      </div>
    )
  }
}

class TopScoreTrack extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    getScoreTrackTokens: PropTypes.func.isRequired,
  }

  getSpaces = () => {
    const spaces = []
    for (let i = 0; i < 25; i++) {
      spaces.push(
        <TrackSquare
          key={24 + i}
          style={{
            width: `${100 / 25}%`,
          }}
          onClick={() => this.props.onClick(24 + i)}
        >
          {this.props.getScoreTrackTokens(24 + i)}
        </TrackSquare>
      )
    }

    return spaces
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {this.getSpaces()}
      </div>
    )
  }
}

class BottomScoreTrack extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    getScoreTrackTokens: PropTypes.func.isRequired,
  }

  getSpaces = () => {
    const numBoxes = 30
    const spaces = []

    for (let i = 0; i < numBoxes; i += 1) {
      spaces.push(
        <TrackSquare
          key={100 - i}
          style={{
            width: `${100 / numBoxes}%`
          }}
          onClick={() => this.props.onClick(100 - i)}
        >
          {this.props.getScoreTrackTokens(100 - i)}
        </TrackSquare>
      )
    }

    return spaces
  }

  render() {

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {this.getSpaces()}
      </div>
    )
  }
}

class RightScoreTrack extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    getScoreTrackTokens: PropTypes.func.isRequired,
  }

  getSpaces = () => {
    const pointOffset = 49
    const numBoxes = 21
    const spaces = []

    for (let i = 0; i < numBoxes; i++) {
      spaces.push(
        <TrackSquare
          key={pointOffset + i}
          style={{
            height: `${100 / numBoxes}%`,
          }}
          onClick={() => this.props.onClick(pointOffset + i)}
        >
          {this.props.getScoreTrackTokens(pointOffset + i)}
        </TrackSquare>
      )
    }

    return spaces
  }

  render() {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {this.getSpaces()}
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
      screenWidth: -1,  // TODO: remove this if we don't need it
      screenHeight: -1, // TODO: remove this if we don't need it
      width: -1,
      height: -1,
    }

    //this.updateDimensions = this.updateDimensions.bind(this)
  }

  /*
  componentWillMount = () => {
    this.updateDimensions()
  }
  */

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
      width: this.div.clientWidth,
      height: this.div.clientHeight,
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
