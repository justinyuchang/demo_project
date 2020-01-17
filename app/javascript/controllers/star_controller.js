import { Controller } from "stimulus";
import ax from 'helpers/axios';

export default class extends Controller {
  static targets = ["icon"]
  toggle(evt) {
    evt.preventDefault();
    let id = this.data.get('id');
    let icon = this.iconTarget;
    ax.post(`/boards/${id}/star_board`)
      .then(function (response) {
        let starred = response.data.starred;

        if (starred) {
          icon.classList.remove('far');
          icon.classList.add('fas');
        } else {
          icon.classList.remove('fas');
          icon.classList.add('far');
        }
      });
  }
}
