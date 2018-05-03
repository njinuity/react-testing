var React = require ('react');
import _ from 'lodash';
// STAR MATCH - Starting Template
const randomSum = (arr, maxSum) => {
  const sets = [[]], sums = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0, len = sets.length; j < len; j++) {
      const candidateSet = sets[j].concat(arr[i]);
      const candidateSum = _.sum(candidateSet);
      if (candidateSum <= maxSum) {
        sets.push(candidateSet);
        sums.push(candidateSum);
      }
    }
  }
  return _.sample(sums);
};
class Game extends React.Component {
  state = {
    selectedNumbers:[],
    usedNumbers: [],
  };
  selectionIsWrong = false;
  numbers = _.range(1,10);
  stars = _.range(randomSum(this.numbers,9));
  selectionIsWrong = _.sum(this.state.selectedNumbers) > this.state.stars;
  renderStars(){
    return this.stars.map(starIndex => <div key = {starIndex}
      className = "star"></div>);
  }
  renderPlayAgain() {
    return (
      <div> className = "game-done">
        <div className = "message"> Nice!</div>
        <button onClick = {this.resetGame}>Play Again </button>
        </div>
    );
  }
  resetGame = () =>{
    this.stars = _.range(randomSum(this.numbers,9));
    this.gameIsDone = false;
    this.setState({
    selectedNumbers:[],
    usedNumbers:[],});
  }
  onNumberClick = number => {
    this.setState(prevState => {
      let {selectedNumbers, usedNumbers} = prevState;

      if (selectedNumbers.indexOf(number)>= 0 ) {
        selectedNumbers = selectedNumbers.filter(sn => sn!==number);}
        else {
          selectedNumbers = [...selectedNumbers,number];
        }

      const selectedSum = _.sum(selectedNumbers);
      if (selectedSum === this.stars.length){
        usedNumbers = [...usedNumbers,...selectedNumbers];
        selectedNumbers = [];
        this.stars = _.range(
          randomSum(_.difference(this.numbers, usedNumbers),9)
        );
      }
      this.selectionIsWrong = selectedSum > this.stars.length;
      this.gameIsDone = usedNumbers.length === this.numbers.length;
      return {
        selectedNumbers,usedNumbers
      }
    }
    )
    }
    numberStatus (number) {
      if (this.state.usedNumbers.indexOf(number)>=0){
        return 'used';
      }
    const isSelected = this.state.selectedNumbers.indexOf(number)>=0;
    if (isSelected){
      return this.selectionIsWrong ? 'wrong':'selected';

    }
    return 'available';
    }

  render() {
    return (
      <div className="game">

        <div className="help">
          Pick 1 or more numbers that sum
          to the number of stars

        <div className="body">
          <div className="stars">
            {this.gameIsDone?
              this.renderPlayAgain()
              :
              this.renderStars()
            }
          </div>
          <div className="play-numbers">
          {this.numbers.map(number => {
            const isUsed =
            this.state.usedNumbers.indexOf(number)>=0;
            const isSelected =
            this.state.selectedNumbers.indexOf(number) >= 0 ;
            return (
              <Number key = {number}
              number = {number}
              status = {this.numberStatus(number)}
              onClick = {this.onNumberClick}/>
            )
            }
            )
          }
          </div>
          </div>
        </div>
      </div>
    );
  }
}
const colors = {
  available:'#eee',
  used:'lightgreen',
  wrong: 'lightcoral',
  selected:'deepskyblue',
};
class Number extends React.PureComponent{
  style(){
    return {};
  }
  componentWillUpdate(nextProps){
    console.log(this.props,nextProps);
  }
  clickHandler = () => {
    if (!this.props.status !== 'used'){
      this.props.onClick(this.props.number);
    };
  }
  render() {
    return (
      <button style = {{backgroundColor: colors[this.props.status]
      }}
      className = "number"
      onClick = {this.clickHandler}
      >
      {this.props.number}
      </button>
    );
  }

}
module.exports =  Game;
