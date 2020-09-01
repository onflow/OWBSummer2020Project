import DappLib from "@trycrypto/dappstarter-dapplib";
import DOM from "../../../lib/components/shared/dom";
import "../../../lib/components/shared/action-card.js";
import "../../../lib/components/shared/action-button.js";
import "../../../lib/components/widgets/text-widget.js";
import "../../../lib/components/widgets/number-widget.js";
import "../../../lib/components/widgets/account-widget.js";
import "../../../lib/components/widgets/upload-widget.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { LitElement, html, customElement, property } from "lit-element";

@customElement("harness-page")
export default class HarnessPage extends LitElement {
  @property()
  get;
  @property()
  post;
  @property()
  title;
  @property()
  category;
  @property()
  description;

  createRenderRoot() {
    return this;
  }
  constructor(args) {
    super(args);
  }

  getPages() {
    return [
      {
        "name": "leel",
        "title": "Leel",
        "description": "View how the smart contracts behind Leel interact with a UI.",
        "category": " ",
        "route": "/leel"
      }
    ];
  }

  handleClick = e => {
    e.preventDefault();
    this.setPageLoader(e.target.dataset.link);
  };

  setPageLoader(name) {
    let pageLoader = document.getElementById("page-loader");
    pageLoader.load(name, this.getPages());
    this.requestUpdate();
  }

  render() {
    let content = html`
      <div class="container m-auto">
        <div class="row fadeIn mt-3 p-2 block">
          <p class="mt-3">
            Click "View" under Leel to view how the smart contracts interact with
            the UI, and how customers/retailers/nonprofits can interact with their 
            transactions.          
          </p>
        </div>
        <ul class="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        ${this.getPages().map(page =>
      html`<li class="col-span-1 bg-white rounded-lg shadow h-64">
                      <div class="flex flex-col items-center p-6 h-full">
                        <div class="font-bold text-xl mb-2">${page.title}</div>
                        <p class="text-gray-700 text-base mb-3">${page.description}</p>
                        <div class="flex flex-row flex-grow">
                            <button
                              @click=${this.handleClick}
                              data-link=${page.name}
                              class="self-end text-white font-bold py-2 px-8 rounded bg-green-500 hover:bg-green-700"}"
                            >
                              View
                            </button>
                          </div>
                      </div>
                    </li>`)
      }
        </ul>
      </div>
    `;
    return content;

  }
}


