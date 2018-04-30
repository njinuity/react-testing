var React = require ('react');
import _ from 'lodash';
import styles from './Game.css';
class Game extends React.Component {
    state = {
    gameStatus: 'playing',
    totalGames :0
  };
  colorValues = randomColors();
  handleClick = (yesClick) => {
    this.setState( prevState =>{
      if (prevState.gameStatus !== 'playing'){
        return null;
      }
      const correct = (this.colorValues.meaningInkMatch ^ yesClick) ===0;
      if (correct){
        score  = score +1,
        console.log('added')
      }

      return {gameStatus:correct ? 'correct': 'wrong'};
    }, this.resetGameAfterDelay);
  }
  resetGameAfterDelay = () => {
    setTimeout(() => {
      this.colorValues = randomColors();
      this.setState(prevState => ({
        totalGames: prevState.totalGames + 1,
        gameStatus: 'playing'
      }));
    },500);
  };
  render() {
    const {
      meaningWord,
      inkWord,
      inkColor,
    } = this.colorValues;
    const { gameStatus } = this.state;
    return (
      <div className={"game"}>
        <div className={"help"}>
          Does the meaning of the top word match the ink
          color of the bottom word?
        </div>
        <div className={"body"}>
           <div className={`game_status status_${this.state.gameStatus}`}></div>
          <div className={"meaning"}>
            {meaningWord.toUpperCase()}
            </div>
          <div className={"ink"}
            style = {{ color:inkColor}}>
            {inkWord.toUpperCase()}
          </div>
          <div className="buttons">
            <button onClick={() => this.handleClick(true)}>
              YES
            </button>
            <button onClick={() => this.handleClick(false)}>
              NO
            </button>
          </div>
          <div>
          Score = {score} Total Games = {this.state.totalGames}
          </div>
        </div>
      </div>
    );
  }
}
let score = 0;
const colors = ['black','blue','red','green','yellow'];
// random color = _.sample(colors)
const randomColors = () => {
  const meaningWord=_.sample(colors);
  const inkWord=_.sample(colors);
  const inkColor=
    Math.random() < 0.4 ? meaningWord: _.sample(colors);
  return {
    meaningWord,
    inkWord,
    inkColor,
    meaningInkMatch: meaningWord === inkColor
  };
};
module.exports =  Game;
