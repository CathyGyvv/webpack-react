import _ from 'lodash';
import './style/index.css' // loader  =>  css-loader   module,   style-loader
import './style/a.scss'

function createDomElement() {
  var dom = document.createElement('div');
  dom.innerHTML = _.join(['aicoder', '.com', ' wow'], '');
  dom.classList.add('box')
  console.log('dom', dom)
  return dom;
}
let divDom = createDomElement()
class Temp {
  show() {
    console.log('this.Age :', this.Age);
  }
  get Age() {
    return this._age;
  }
  set Age(val) {
    this._age = val + 1;
  }
}

let t = new Temp();
t.Age = 19;

t.show();
// document.body.appendChild(divDom);