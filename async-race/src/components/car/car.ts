import BaseComponent from '../baseComponent/baseComponent';

class Car extends BaseComponent {
  container = document.getElementById('car-container');

  getCarParams(carName: string, carColor: string) {
    this.inner = `
    <div class="car__controls">
      <button class="button car__select-button">SELECT</button>
      <button class="button car__remove-button">REMOVE</button>
      <p class="car__name">${carName}</p>
    </div>
    <div class="car__container">
      <button class="button car__start-button">A</button>
      <button class="button car__stop-button">B</button>
      <svg class="car__img" width="120" height="60" fill=${carColor}>
        <use xlink:href="./assets/img/car.svg#car"></use>
      </svg>
      <img src="./assets/img/finishflag.png" alt="finish-flag" class="car__finish-img">
    <div>`;
  }
}

export default Car;
