var React = require ('react');
import _ from 'lodash';
class Game extends React.Component {
  state = {
    gameStatus:'new', // playing, challenge, won, new ,lost
    selectedCells:[],
  }
  grid = createArray(this.props.gridSize * this.props.gridSize);
  cellWidthPercentage = 100/(this.props.gridSize);
  challengeCells = _.sampleSize(
    this.grid,
    this.props.challengeSize
  );
  score = 0;
  gameIsIdle = () =>
  ['new','won','lost'].includes(this.state.gameStatus);
  showChallengeCells = () =>
  ['challenge','lost'].includes(this.state.gameStatus);
  showSelectedCells =()=>
  ['playing','won','lost'].includes(this.state.gameStatus);
  static messages = {
    new: 'Click the Start button to play',
   challenge: 'Memorize these blue cells',
   playing: 'Recall the cells that were blue',
   won: 'You Win!',
   lost: 'Game Over!',
  }
  onCellClick = (cellId) => {
    this.setState(prevState => {
      if (prevState.gameStatus !== 'playing'){
        return null;
      }
      if (prevState.selectedCells.indexOf(cellId)>=0){
        return null;
      }
      const newSelectedCells = [...prevState.selectedCells,cellId];
      if (this.calcNewGameStatus(newSelectedCells) === 'won'){
        this.score = this.score +1;
        return {
          selectedCells:newSelectedCells,
          gameStatus: this.calcNewGameStatus(newSelectedCells),

        }
      }
      if (this.calcNewGameStatus(newSelectedCells) === 'lost'){
        this.score = 0;
        return {
          selectedCells:newSelectedCells,
          gameStatus: this.calcNewGameStatus(newSelectedCells),
        }
      }

      return {
          selectedCells:newSelectedCells,
          gameStatus: this.calcNewGameStatus(newSelectedCells)
      }
    })
  }

  calcNewGameStatus = (newSelectedCells) => {
    if (_.difference(this.challengeCells,newSelectedCells).length ===0
        ){
      return 'won';
    }
    if (_.difference(newSelectedCells,this.challengeCells).length===this.props.wrongsAllowed) {
      return 'lost';
    }
    return 'playing';
  }
  startGame = () => {
    clearTimeout(this.timerId);
    if (this.state.gameStatus === 'won'){
      this.grid = createArray((this.props.gridSize+this.score) * (this.props.gridSize+this.score));

      this.cellWidthPercentage = 100/(this.props.gridSize + this.score
      );
    }
    if (this.state.gameStatus === 'lost'){
      this.grid = createArray((this.props.gridSize) * (this.props.gridSize));

      this.cellWidthPercentage = 100/(this.props.gridSize)
    }
    this.challengeCells = _.sampleSize(this.grid,this.props.challengeSize+this.score);
    this.setState(
      {gameStatus: `challenge`,selectedCells:[]

      },
      ()=>{
        this.timerId = setTimeout(
          () => this.setState({
            gameStatus:'playing'
          }),3000
        )
      }
    )
  }
  render() {
    return (
      <div className="game">
        <div className="help">
          You will have 3 seconds to memorize {this.props.challengeSize} blue random cells
        </div>
        <div>
        {this.score}
        </div>
        <div className="grid">
          {this.grid.map (cellId =>{
            const cellIsChallenge = this.challengeCells.indexOf(cellId)>=0;
            const cellIsSelected = this.state.selectedCells.indexOf(cellId)>= 0;
          return(
            <Cell key = {cellId}
            id = {cellId}
            widthPercentage = {this.cellWidthPercentage}
            cellIsChallenge = {cellIsChallenge}
            showAsChallenge = {this.showChallengeCells() && cellIsChallenge}
            showAsSelected = {this.showSelectedCells() && cellIsSelected}
            onClick = {this.onCellClick}
            />
      );}
        )}
        </div>
        {this.gameIsIdle() && (
        <button onClick = {this.startGame}>
        {this.state.gameStatus ==='new'?'Start':'Play Again'}
        </button>
      )}
        <div className="message">{Game.messages[this.state.gameStatus]}</div>
      </div>
    );
  }
}
const colors = {
  available: '#eee',
  challenge: 'deepskyblue',
  correct:'lightgreen',
  wrong:'lightcoral',

};
const createArray = size =>
  Array.from ({length :size},(_,i)=>i);
class Cell extends React.PureComponent {
  backgroundColor = () => {
      if (this.props.showAsSelected) {
        return this.props.cellIsChallenge
          ? colors.correct
          : colors.wrong;
      }
      if (this.props.showAsChallenge) {
        return colors.challenge;
      }
      return colors.available;
    };
    // componentWillUpdate(){
    //   console.log(`Cell Updated ${this.props.id}`)
    // }
    handleClick = () => this.props.onClick(this.props.id);
    render() {
      return (
        <div
          className="cell"
          style={{
            width: `${this.props.widthPercentage}%`,
            backgroundColor: this.backgroundColor(),
          }}
          onClick={this.handleClick}
        />
      );
    }
  }
module.exports =  Game;
