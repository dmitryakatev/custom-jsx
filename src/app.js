import { Component } from './jsx/component';
import { Input } from './input';

export class App extends Component {
  onInit() {
    this.input1 = new Input({ label: 'number1', value: 34 });
    this.input2 = new Input({ label: 'number2', value: 17 });
    this.input3 = new Input({ label: 'result', readonly: true });

    return (
      <div style={{ color: 'red' }} class={{ 'my-class': true }}>
        <this.input1 />
        <span>+</span>
        <this.input2 />
        <span>=</span>
        <this.input3 />
        <button link="button" onClick={() => this.calc()}>click me!</button>
      </div>
    );
  }

  calc() {
    const val1 = parseInt(this.input1.getValue(), 10);
    const val2 = parseInt(this.input2.getValue(), 10);

    const val = val1 + val2;

    this.input3.setValue(val);

    this.setAttr('button', {
      style: {
        background: val < 0 ? 'red' : 'green',
      },
    });
  }
}
