import React, { Component } from 'react';
import PropTypes from 'prop-types'

import pillImg from '../img/pill.png'
//import workerImg from '../img/worker.png'
import villageImg from '../img/village_black.png'
import tradePostImg from '../img/tradepost_black.png'
import templeImg from '../img/temple_black.png'
import strongholdImg from '../img/stronghold_black.png'
import sanctuaryImg from '../img/sanctuary_black.png'
import actionTokenImg from '../img/action_token.png'
import trackerImg from '../img/tracker_black.png'

// TODO: replace tradepost with tradePost
// TODO: remove unused static variables

// nomad board: 620 x 399
export default class PlayerBoard extends Component {
  static propTypes = {
    villageCount: PropTypes.number.isRequired,
    tradePostCount: PropTypes.number.isRequired,
    templeCount: PropTypes.number.isRequired,
    strongholdCount: PropTypes.number.isRequired,
    sanctuaryCount: PropTypes.number.isRequired,

    yourTurn: PropTypes.bool.isRequired,

    onPowerBowlClick: PropTypes.func.isRequired,
    onVillageDepotClick: PropTypes.func.isRequired,
    onTradePostDepotClick: PropTypes.func.isRequired,
    onTempleDepotClick: PropTypes.func.isRequired,
    onStrongholdDepotClick: PropTypes.func.isRequired,
    onStrongholdActionClick: PropTypes.func.isRequired,
    onSanctuaryDepotClick: PropTypes.func.isRequired,
    onShovelTrackClick: PropTypes.func.isRequired,
    onShippingTrackClick: PropTypes.func.isRequired,
  }

  static TOP_RATIO = 52
  static BOTTOM_RATIO = 100 - PlayerBoard.TOP_RATIO
  static POWER_BOWL_RATIO = 48
  static TERRAFORM_RATIO = 100 - PlayerBoard.POWER_BOWL_RATIO
  static BUILDINGS_RATIO = 68
  static SHIPPING_AND_ABILITY_RATIO = 100 - PlayerBoard.BUILDINGS_RATIO

  static BOARD_STYLE = {
    // backgroundImage: `url(${nomadBoard})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    position: 'relative', // TODO: Do we need this/
    height: 0,
    paddingTop: ((399 / 620) * 100) + '%', // '64.354838709%'
  }

  static BODY_STYLE = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }

  static TOP_STYLE = {
    height: `${PlayerBoard.TOP_RATIO}%`,
    display: 'flex',
    alignItems: 'stretch',
  }

  static BOTTOM_STYLE = {
    height: `${PlayerBoard.BOTTOM_RATIO}%`,
    display: 'flex',
    alignItems: 'stretch',
  }

  handlePowerBowlClick = (id) => {
    this.props.onPowerBowlClick(id)
  }

  handleVillageDepotClick = (id) => {
    this.props.onVillageDepotClick(id)
  }

  handleTradePostDepotClick = (id) => {
    this.props.onTradePostDepotClick(id)
  }

  handleTempleDepotClick = (id) => {
    this.props.onTempleDepotClick(id)
  }

  handleStrongholdDepotClick = () => {
    this.props.onStrongholdDepotClick()
  }

  handleStrongholdActionClick = () => {
    this.props.onStrongholdActionClick()
  }

  handleSanctuaryDepotClick = () => {
    this.props.onSanctuaryDepotClick()
  }

  handleShovelTrackClick = (id) => {
    this.props.onShovelTrackClick(id)
  }

  handleShippingTrackClick = (distance) => {
    this.props.onShippingTrackClick(parseInt(distance, 10))
  }

  render() {
    const boardStyle = {
      ...PlayerBoard.BOARD_STYLE,
      backgroundImage: `url(${this.props.boardImg})`,
    }


    return (
      <div style={boardStyle}>
        <div
          style={{
            /* PlayerBoard.BODY_STYLE */
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          {/* Top part of board */}
          {/* Power bowls */}
          <div
            style={{
              position: 'absolute',
              top: '3.5%',
              left: '3.5%',
              height: '44.2%',
              width: '41.8%',
              display: 'inline-block',
              verticalAlign: 'top',
              // border: '2px solid blue',
            }}
          >
            {/* Inner div that contains the bowls */}
            <PowerBowls
              onClick={this.handlePowerBowlClick}
              bowl1Count={2}
              bowl2Count={4}
              bowl3Count={6}
            />
          </div>
          {/* Terraforming */}
          <div
            style={{
              position: 'absolute',
              top: '18.25%',
              left: '81.3%',
              width: '13.8%',
              height: '23.45%',
            }}
          >
            <ShovelTrack
              count={this.props.shovelLevel}
              onClick={this.handleShovelTrackClick}
            />
          </div>

          {/* Bottom part of board */}
          {/* Buildings */}
          <div
            style={{
              position: 'absolute',
              top: '52.2%',
              left: '10%',
              height: '42.2%',
              width: '51.3%',
              display: 'inline-block',
              verticalAlign: 'top',
              // border: '2px solid green',
            }}
          >
            <BuildingDepot
              villageCount={this.props.villageCount}
              tradePostCount={this.props.tradePostCount}
              templeCount={this.props.templeCount}
              strongholdCount={this.props.strongholdCount}
              sanctuaryCount={this.props.sanctuaryCount}
              onVillageDepotClick={this.handleVillageDepotClick}
              onTradePostDepotClick={this.handleTradePostDepotClick}
              onTempleDepotClick={this.handleTempleDepotClick}
              onStrongholdDepotClick={this.handleStrongholdDepotClick}
              onStrongholdActionClick={this.handleStrongholdActionClick}
              onSanctuaryDepotClick={this.handleSanctuaryDepotClick}
            />
          </div>
          {/* Shipping & abilities */}
          <div
            style={{
              position: 'absolute',
              top: '55.8%',
              left: '76.2%',
              height: '13.8%',
              width: '18%',
            }}
          >
            <ShippingTrack onClick={this.handleShippingTrackClick} />
          </div>
        </div>
      </div>
    )
  }
}

class PowerBowls extends Component {
  static propTypes = {
    bowl1Count: PropTypes.number,
    bowl2Count: PropTypes.number,
    bowl3Count: PropTypes.number,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    bowl1Count: 4,
    bowl2Count: 4,
    bowl3Count: 4,
  }

  handleClick = (e) => {
    this.props.onClick(e.target.id)
  }

  getPills(bowlNumber) {
    const pills = []
    const count = this.props[`bowl${bowlNumber}Count`]

    for (let i = 0; i < count; i += 1) {
      pills.push(
        <img
          key={i}
          src={pillImg}
          style={{
            width: '25%',
            height: 'auto',
          }}
          alt=""
        />
      )
    }

    return pills
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {/* Power bowl 2 */}
        <div
          id="2"
          onClick={this.handleClick}
          style={{
            position: 'absolute',
            left: '10%',
            width: '30%',
            height: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            flexWrap: 'wrap',
          }}
        >

          {this.getPills(2)}

        </div>

        {/* Power bowl 1*/}
        <div
          id="1"
          style={{
            position: 'absolute',
            top: '50%',
            left: '10%',
            width: '30%',
            height: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            flexWrap: 'wrap',
          }}
          onClick={this.handleClick}
        >

          {this.getPills(1)}

        </div>

        {/* Power bowl 3 */}
        <div
          id="3"
          style={{
            position: 'absolute',
            top: '26%',
            left: '60%',
            width: '30%',
            height: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            flexWrap: 'wrap',
          }}
          onClick={this.handleClick}
        >

          {this.getPills(3)}

        </div>
      </div>
    )
  }
}

/* eslint-disable react/require-render-return */
class DragAndDropDepot extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      // the dom element being dragged, if any
      draggedElement: {},
    }
  }

  /** This should be overwritten by the child class */
  get buildingType() {
    throw new Error('buildingType getter not implemented in child class of DragAndDropDepot')
  }

  handleClick = (e) => {
    this.props.onClick(e.target.id)
  }

  handleDragStart = (e) => {
    const data = {
      type: this.buildingType,
      id: e.target.id,
    }

    e.dataTransfer.setData('application/json', JSON.stringify(data))
    // make the element somewhat transparent
    e.target.style.opacity = 0.5
    this.setState({
      draggedElement: e.target
    })
  }

  handleDragEnd = (e) => {
    // make the transparent element opaque
    const style = this.state.draggedElement.style

    this.setState({
      draggedElement: {},
    }, () => {
      style.opacity = 1
    })
  }

  render() {
    throw new Error('render method not implemented in child class of DragAndDropDepot')
  }
}
/* eslint-enable react/require-render-return */

class ShovelTrack extends DragAndDropDepot {
  static propTypes = DragAndDropDepot.propTypes

  static defaultProps = {
    count: 0,
  }

  get buildingType() {
    return 'shovelTracker'
  }

  handleClick = (e) => {
    this.props.onClick(e.target.id)
  }

  getSpaces = () => {
    const spaces = []

    for (let i = 0; i < 3; i += 1) {
      spaces.push(
        <div
          key={2 - i}
          style={{
            width: '33.3%',
            height: '33.3%',
          }}
        >
          {this.props.count === i &&
            <img
              src={trackerImg}
              alt=""
              style={{
                position: 'absolute',
                top: `${(33.3 * (2 - i)) - 7}%`,
                left: '5.5%',
                width: '22.5%',
                height: 'auto',
              }}
              onClick={this.handleClick}
              onDragEnd={this.handleDragEnd}
              onDragStart={this.handleDragStart}
            />
          }
        </div>
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
        }}
      >
        {this.getSpaces()}
      </div>
    )
  }
}

class BuildingDepot extends Component {
  static propTypes = {
    villageCount: PropTypes.number.isRequired,
    tradePostCount: PropTypes.number.isRequired,
    templeCount: PropTypes.number.isRequired,
    strongholdCount: PropTypes.number.isRequired,
    sanctuaryCount: PropTypes.number.isRequired,

    onVillageDepotClick: PropTypes.func.isRequired,
    onTradePostDepotClick: PropTypes.func.isRequired,
    onTempleDepotClick: PropTypes.func.isRequired,
    onStrongholdDepotClick: PropTypes.func.isRequired,
    onStrongholdActionClick: PropTypes.func.isRequired,
    onSanctuaryDepotClick: PropTypes.func.isRequired,
  }

  handleVillageDepotClick = (id) => {
    this.props.onVillageDepotClick(id)
  }

  handleTradePostDepotClick = (id) => {
    this.props.onTradePostDepotClick(id)
  }

  handleTempleDepotClick = (id) => {
    this.props.onTempleDepotClick(id)
  }

  handleStrongholdDepotClick = () => {
    this.props.onStrongholdDepotClick()
  }

  handleStrongholdActionClick = () => {
    this.props.onStrongholdActionClick()
  }

  handleSanctuaryDepotClick = () => {
    this.props.onSanctuaryDepotClick()
  }

  render() {
    //const topHeight = 32
    //const middleBuffer = 10.7
    const middleHeight = 27.8
    const bottomBuffer = 10.5
    const bottomHeight = 18.5

    /*
    const topRow = {
      
    }
    */
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {/* Top Row */}
        <div
          style={{
            position: 'absolute',
            width: '17.1%',
            height: '32.3%',
          }}
        >
          <StrongholdDepot
            count={this.props.strongholdCount}
            onClick={this.handleStrongholdDepotClick}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '2.8%',
            left: '24.9%',
            width: '14.6%',
            height: '27.8%',
          }}
        >
          <StrongholdActionSpace
            placed={false}
            onClick={this.handleStrongholdActionClick}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '5.4%',
            left: '58%',
            width: '17.7%',
            height: '22.1%'
          }}
        >
          <SanctuaryDepot
            count={this.props.sanctuaryCount}
            onClick={this.handleSanctuaryDepotClick}
          />
        </div>

        {/* Middle Row */}
        <div
          style={{
            position: 'absolute',
            top: '43.2%',
            width: '35%',
            height: '27.8%',
          }}
        >
          <TradePostDepot
            count={this.props.tradePostCount}
            onClick={this.handleTradePostDepotClick}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            top: '44.3%',
            right: '0%',
            width: '41.7%',
            height: '24.9%',
          }}
        >
          <TempleDepot
            count={this.props.templeCount}
            onClick={this.handleTempleDepotClick}
          />
        </div>

        {/* Bottom Row */}
        <div
          style={{
            position: 'relative',
            top: `${42.7 + middleHeight + bottomBuffer}%`,
            left: '8.4%',
            width: '70.5%',
            height: `${bottomHeight}%`,
          }}
        >
          <VillageDepot
            count={this.props.villageCount}
            onClick={this.handleVillageDepotClick}
          />
        </div>
      </div>
    )
  }
}

class VillageDepot extends DragAndDropDepot {
  static propTypes = DragAndDropDepot.propTypes

  get buildingType() {
    return 'village'
  }

  getVillages = () => {
    const villages = []

    for (let i = 0; i < 8; i += 1) {
      villages.push(
        this.props.count + i >= 8 &&
          <img
            key={i}
            id={i}
            src={villageImg}
            alt=""
            style={{
              position: 'absolute',
              top: 0,
              left: `${(12.92 * i) - 1.5}%`,
              width: '12.5%',
              height: 'auto',
            }}
            onClick={this.handleClick}
            onDragEnd={this.handleDragEnd}
            onDragStart={this.handleDragStart}
          />
      )
    }

    return villages
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {this.getVillages()}
      </div>
    )
  }
}

class TradePostDepot extends DragAndDropDepot {
  static propTypes = DragAndDropDepot.propTypes

  get buildingType() {
    return 'tradePost'
  }

  getTradePosts = () => {
    const numTradePosts = 4
    const tradePosts = []

    for (let i = 0; i < numTradePosts; i += 1) {
      tradePosts.push(
        this.props.count + i >= 4 &&
          <img
            key={i}
            id={i}
            src={tradePostImg}
            alt=""
            style={{
              position: 'absolute',
              top: '10%',
              left: `${(27 * i) - 4}%`,
              width: '27%',
              height: 'auto',
            }}
            onClick={this.handleClick}
            onDragEnd={this.handleDragEnd}
            onDragStart={this.handleDragStart}
          />
      )
    }

    return tradePosts
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        {this.getTradePosts()}
      </div>
    )
  }
}

class TempleDepot extends DragAndDropDepot {
  static propTypes = DragAndDropDepot.propTypes

  get buildingType() {
    return 'temple'
  }

  getTemples = () => {
    const numTemples = 3
    const temples = []

    for (let i = 0; i < numTemples; i += 1) {
      temples.push(
        this.props.count + i >= 3 &&
          <img
            key={i}
            id={i}
            src={templeImg}
            alt=""
            style={{
              position: 'absolute',
              left: `${(34.4 * i) + 1.5}%`,
              width: `${28}%`,
              height: 'auto',
            }}
            onClick={this.handleClick}
            onDragEnd={this.handleDragEnd}
            onDragStart={this.handleDragStart}
          />
      )
    }

    return temples
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        {this.getTemples()}
      </div>
    )
  }
}

class StrongholdDepot extends DragAndDropDepot {
  static propTypes = {
    count: PropTypes.number,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    count: 0,
  }

  get buildingType() {
    return 'stronghold'
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
        onClick={this.props.onClick}
      >
        {this.props.count >= 1 &&
          <img
            id="0"
            src={strongholdImg}
            alt=""
            style={{
              position: 'absolute',
              top: '-10%',
              left: '5%',
              width: '90%', 
              height: 'auto',
            }}
            onDragEnd={this.handleDragEnd}
            onDragStart={this.handleDragStart}
          />
        }
      </div>
    )
  }
}

class StrongholdActionSpace extends DragAndDropDepot {
  
  static propTypes = {
    placed: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    placed: false
  }

  get buildingType() {
    return 'strongholdAction'
  }

  handleClick = () => {
    this.props.onClick()
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
        onClick={this.handleClick}
      >
        {this.props.placed &&
          <img
            src={actionTokenImg}
            alt=""
            style={{
              position: 'absolute',
              top: '-4%',
              left: '-4%',
              width: '108%',
              height: 'auto',
            }}
            onDragEnd={this.handleDragEnd}
            onDragStart={this.handleDragStart}
          />
        }
      </div>
    )
  }
}

class SanctuaryDepot extends DragAndDropDepot {
  static propTypes = DragAndDropDepot.propTypes

  get buildingType() {
    return 'sanctuary'
  }

  render() {
    return (
      <div
        onClick={this.handleClick}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {this.props.count >= 1 &&
          <img
            id="0"
            src={sanctuaryImg}
            alt=""
            style={{
              position: 'absolute',
              top: '-45%',
              left: '12%',
              width: '76%',
              height: 'auto',
            }}
            onDragEnd={this.handleDragEnd}
            onDragStart={this.handleDragStart}
          />
        }
      </div>
    )
  }
}

class ShippingTrack extends DragAndDropDepot {
  static propTypes = DragAndDropDepot.propTypes

  static defaultProps = {
    count: 0,
  }

  get buildingType() {
    return 'shippingTracker'
  }

  handleClick = (e) => {
    this.props.onClick(e.target.id)
  }

  getSpaces = () => {
    const spaces = []

    for (let i = 0; i < 4; i += 1) {
      spaces.push(
        <div
          key={i}
          id={i}
          style={{
            position: 'absolute',
            top: '-16%',
            left: `${4 + (i * 25.2)}%`,
            width: '18%',
            height: 'auto',
          }}
        >
          {this.props.count === i &&
            <img
              id={this.props.count}
              src={trackerImg}
              style={{
                width: '100%',
                height: 'auto',
              }}
              alt=""
              onClick={this.handleClick}
              onDragEnd={this.handleDragEnd}
              onDragStart={this.handleDragStart}
            />
          }
        </div>
      )
    }

    return spaces
  }

  // TODO: you forgot to make the divs
  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        {this.getSpaces()}
      </div>
    )
  }
}
