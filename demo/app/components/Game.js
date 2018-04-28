var React = require ('react');
import _ from 'lodash';
import styles from './Game.css';
class Game extends React.Component {
    state = {
    meaningWord:_.sample(colors),
    inkWord:_.sample(colors),
    inkColor:_.sample(colors),
    gameStatus: 'playing'
  };
  render() {
    return (
      <div className={styles.game}>
        <div className={styles.help}>
          Does the meaning of the top word match the ink
          color of the bottom word?
        </div>
        <div className={styles.body}>
          // <div className={styles.game_status} />
          // <div className= {`styles.status_${this.state.gameStatus}`}></div>
          <div
            className={`game_status status_${
              this.state.gameStatus
            }`}
          />
          <div className={styles.meaning}>
            {this.state.meaningWord.toUpperCase()}
            </div>
          <div className={styles.ink}
            style = {{ color:this.state.inkColor}}>
          {this.state.inkWord.toUpperCase()}
          </div>
          <div className={styles.buttons}>
            <button>YES</button>
            <button>NO</button>
          </div>
        </div>
      </div>
    );
  }
}
const colors = ['black','blue','red','green','yellow'];
// random color = _.sample(colors)

module.exports =  Game;
