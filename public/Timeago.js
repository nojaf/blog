import { formatDistanceToNow } from "https://esm.sh/date-fns@3.6.0";

class TimeAgo extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const date = new Date(this.textContent);
    const timeAgo = formatDistanceToNow(date, { addSuffix: true });
    this.textContent = timeAgo;
  }
}

customElements.define("time-ago", TimeAgo);
