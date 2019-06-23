import React from 'react';

import { Wrap, Title, Button, Input } from './styled';

//extends  확장 
//모두 컴포넌트단위로 

class App extends React.Component {
  state = {
    count: 0
  }

  handleNumberChange(e) {
    this.setState({
      count: parseInt(e.target.value)
    })
  }

  handleReset() {
    this.setState({
      count: 0
    })
  }

  handleIncrement() {
    this.setState({
      count: this.state.count + 1
    })
  }


  handleDecrement() {
    this.setState({
      count: this.state.count - 1
    })
  }



  render() {
    const { count } = this.state;
    return (
      <Wrap>
        <Title>{count}</Title>
        <div>
          <Button onClick={() => this.handleIncrement()}>+</Button>
          <Button onClick={() => this.handleReset()}>R</Button>
          <Button onClick={() => this.handleDecrement()}>-</Button>
        </div>
        <div>
          {/* <Input
            type="number"
            placeholder="초기값을 넣어주세요"
            value={count}
            onChange={e => this.handleNumberChange(e)} /> */}
        </div>

      </Wrap>
    );
  }
}

export default App
