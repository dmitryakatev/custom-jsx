import { Component } from './jsx/component';

export class Input extends Component {
  onInit() {
    this.props.label = this.props.label ?? '';
    this.props.value = this.props.value ?? '';
    this.props.readonly = this.props.readonly ?? false;
    
    return (
      <div style={{ display: 'inline-block' }}>
        <div>
          <label>
            <txt link="label">{this.props.label}</txt>
          </label>
        </div>
        <input
          link="input"
          value={this.props.value}
          readOnly={this.props.readonly}
          onInput={(e) => this.onChange(e)} />
      </div>
    );
  }

  getValue() {
    return this.props.value;
  }

  setValue(value) {
    this.props.value = value;
    this.setAttr('input', { value });
  }

  setLabel(label) {
    this.props.label = label;
    this.setText('label', { value: label });
  }

  // @private
  onChange(e) {
    this.props.value = e.target.value;
  }
}
