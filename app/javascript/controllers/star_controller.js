import { Controller } from "stimulus";
import ax from 'axios';

export default class extends Controller {
  static targets = [ "icon" ]

  connect() {
    this.outputTarget.textContent = 'Hello, Stimulus!'
  }

  toggle(evt) {
    evt.preventDefult
  }
}
