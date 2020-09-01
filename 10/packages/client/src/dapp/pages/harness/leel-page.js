import "../components/page-panel.js";
import "../components/page-body.js";
import "../../../lib/components/shared/action-card.js";
import "../../../lib/components/widgets/account-widget.js";
import "../../../lib/components/widgets/account-widget-retailer.js";
import "../../../lib/components/widgets/account-widget-nonprofit.js";
import "../../../lib/components/widgets/text-widget.js";
import "../../../lib/components/widgets/number-widget.js";
import "../../../lib/components/widgets/upload-widget.js";
import DappLib from "@trycrypto/dappstarter-dapplib";
import { LitElement, html, customElement, property } from "lit-element";

@customElement('leel-page')
export default class BallotPage extends LitElement {
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

  render() {

    let content = html`
      <page-body
        title="${this.title}"
        category="${this.category}"
        description="${this.description}"
      >
      <action-card
      title="Setup For Customer"
      description="Sets up a customer."
      action="setupForCustomer"
      method="post"
      fields="customer"
    >

      <account-widget
          field="customer"
          label="Customer"
          placeholder="Customer address"
        ></account-widget>

      

    </action-card>

    <action-card
      title="Setup For Retailer"
      description="Sets up a retailer."
      action="setupForRetailer"
      method="post"
      fields="retailer"
    >

      <account-widget-retailer
          field="retailer"
          label="Retailer"
          placeholder="Retailer address"
        ></account-widget-retailer>

    </action-card>

    <action-card
      title="Earning Tokens"
      description="A customer will earn tokens when buying from the retailer."
      action="earningTokens"
      method="post"
      fields="retailer customer amountToEarn"
    >

        <account-widget-retailer
          field="retailer"
          label="Retailer"
          placeholder="Retailer address"
        ></account-widget-retailer>

        <account-widget
          field="customer"
          label="Customer"
          placeholder="Customer address"
        ></account-widget>

        <text-widget
          field="amountToEarn"
          label="Amount To Earn"
          placeholder="..."
        ></text-widget>

    </action-card>

    <action-card
      title="Create Reward"
      description="A retailer can create a reward."
      action="createReward"
      method="post"
      fields="retailer rewardItem minimumTokens allowedRetailers minimumUCV minimumCV"
    >

      <account-widget-retailer
          field="retailer"
          label="Retailer"
          placeholder="Retailer address"
        ></account-widget-retailer>

      <text-widget
        field="rewardItem"
        label="Reward Item"
        placeholder="..."
      ></text-widget>

      <text-widget
          field="minimumTokens"
          label="Minimum Required Tokens"
          placeholder="..."
      ></text-widget>

      <h1>For Other Retailers:</h1>

      <text-widget
        field="allowedRetailers"
        label="Other Allowed Retailers"
        placeholder="..."
      ></text-widget>

      <text-widget
          field="minimumUCV"
          label="Minimum UCV"
          placeholder="..."
      ></text-widget>

      <text-widget
          field="minimumCV"
          label="Minimum CV"
          placeholder="..."
      ></text-widget>

    </action-card>

    <action-card
      title="Spend Tokens"
      description="Spend tokens at a retailer."
      action="spendTokens"
      method="post"
      fields="customer retailer rewardItem booleanCheck foo otherRetailer amountFromOtherRetailer"
    >

        <account-widget
          field="customer"
          label="Customer"
          placeholder="Customer address"
        ></account-widget>

        <account-widget-retailer
          field="retailer"
          label="Retailer"
          placeholder="Retailer address"
        ></account-widget-retailer>

        <text-widget
        field="rewardItem"
        label="What reward NFT will you purchase?"
        placeholder="..."
      ></text-widget>

        <label>Use tokens from other retailer?  </label>
        <input type="checkbox" data-field="foo">

        <account-widget-retailer
          field="otherRetailer"
          label="Other Retailer (only if using other retailer, otherwise this field is N/A)"
          placeholder="Other retailer address"
        ></account-widget-retailer>

        <text-widget
          field="amountFromOtherRetailer"
          label="Amount of tokens from other retailer"
          placeholder="..."
        ></text-widget>

    </action-card>

    <action-card
      title="Remove Reward"
      description="A retailer can remove a reward."
      action="removeReward"
      method="post"
      fields="retailer rewardItem"
    >

      <account-widget-retailer
          field="retailer"
          label="Retailer"
          placeholder="Retailer address"
        ></account-widget-retailer>

      <text-widget
        field="rewardItem"
        label="Reward Item"
        placeholder="..."
      ></text-widget>

    </action-card>

    <action-card
      title="Trade"
      description="Trade an NFT for FTs from another customer."
      action="trade"
      method="post"
      fields="customer1 nftToGive customer2 ftToGive fromWhatRetailer"
    >

        <account-widget
          field="customer1"
          label="Customer1"
          placeholder="Customer address to give NFT"
        ></account-widget>

        <text-widget
          field="nftToGive"
          label="NFT To Give"
          placeholder="..."
        ></text-widget>

        <account-widget
          field="customer2"
          label="Customer2"
          placeholder="Customer address to receive NFT"
        ></account-widget>

        <text-widget
          field="ftToGive"
          label="Amount of FT to Give"
          placeholder="..."
        ></text-widget>

        <account-widget-retailer
          field="fromWhatRetailer"
          label="From What Retailer"
          placeholder="..."
        ></account-widget-retailer>
    </action-card>

    <action-card
      title="Instagram Ad"
      description="A customer will earn tokens when doing an instagram ad."
      action="instagramAd"
      method="post"
      fields="retailer customer"
    >

        <account-widget-retailer
          field="retailer"
          label="Retailer"
          placeholder="Retailer address"
        ></account-widget-retailer>

        <account-widget
          field="customer"
          label="Customer"
          placeholder="Customer address"
        ></account-widget>

    </action-card>

    <action-card
      title="Setup For Non-Profit"
      description="Sets up a non-profit."
      action="setupForNonProfit"
      method="post"
      fields="nonprofit"
    >

      <account-widget-nonprofit
          field="nonprofit"
          label="Nonprofit"
          placeholder="Non-Profit address"
        ></account-widget-nonprofit>

    </action-card>

    <action-card
      title="Stake Non-Profit"
      description="A customer can stake a non-profit."
      action="stakeNonProfit"
      method="post"
      fields="nonprofit customer ftToGive retailerFrom"
    >

        <account-widget-nonprofit
          field="nonprofit"
          label="Nonprofit"
          placeholder="Non-Profit address"
        ></account-widget-nonprofit>

        <account-widget
          field="customer"
          label="Customer"
          placeholder="Customer address"
        ></account-widget>

        <text-widget
          field="ftToGive"
          label="Amount of FTs to Give"
          placeholder="..."
        ></text-widget>

        <account-widget-retailer
          field="retailerFrom"
          label="Retailer to take tokens from"
          placeholder="Retailer address"
        ></account-widget-retailer>

    </action-card>

    <action-card
      title="Read NFTs"
      description="Reads NFTs at an Account"
      action="readTokens"
      method="get"
      fields="customer"
    >

      <account-widget
          field="customer"
          label="Customer"
          placeholder="Customer address"
        ></account-widget>

    </action-card>

    <action-card
      title="Read Tokens"
      description="Reads Fungible Tokens in an Account"
      action="readMappedTokens"
      method="get"
      fields="customer"
    >

      <account-widget
          field="customer"
          label="Customer"
          placeholder="Customer address"
        ></account-widget>

    </action-card>

    <action-card
      title="Read Rewards"
      description="Reads the rewards at a retailer"
      action="readRewards"
      method="get"
      fields="retailer"
    >

      <account-widget-retailer
          field="retailer"
          label="Retailer"
          placeholder="Retailer address"
        ></account-widget-retailer>

    </action-card>

    <action-card
      title="Read NonProfit Tokens"
      description="Reads the Tokens that a NonProfit holds from hosting a campaign."
      action="readNonProfitTokens"
      method="get"
      fields="nonprofit"
    >

      <account-widget-nonprofit
          field="nonprofit"
          label="Nonprofit"
          placeholder="Nonprofit address"
        ></account-widget-nonprofit>

    </action-card>

    <action-card
      title="Read ReferenceNFT"
      description="Reads the reference NFT of the user - will return UCV & CV from a specific retailer."
      action="readReferenceNFT"
      method="get"
      fields="customer retailer"
    >

      <account-widget
          field="customer"
          label="Customer"
          placeholder="Customer address"
      ></account-widget>

      <account-widget-retailer
          field="retailer"
          label="CV From Which Retailer?"
          placeholder="Retailer address"
      ></account-widget-retailer>

    </action-card>


      </page-body>
      <page-panel id="resultPanel"></page-panel>
    `;

    return content;
  }
}

