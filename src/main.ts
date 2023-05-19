import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
import { hasTemplate } from "card-tools/src/templates";
import { bindActionHandler } from "card-tools/src/action";
import { createCard, errorElement } from "card-tools/src/lovelace-element";
import { moreInfo } from "card-tools/src/more-info";
import pjson from "../package.json";
import { bind_template } from "./templates";
import { hass } from "card-tools/src/hass";

const OPTIONS = [
  "hummingbot_entity",
];

const ENTITY_PREFIX = "hummingbot_";

const ENTITY_STRATEGY_START = "strategy_start";
const ENTITY_STRATEGY_STOP = "strategy_stop";
const ENTITY_STRATEGY_IMPORT = "strategy_import";
const ENTITY_STRATEGY_RUNNING = "strategy_running";
const ENTITY_STRATEGY_IMPORTED = "strategy_imported";
const ENTITY_STRATEGY_ACTIVE_ORDERS = "active_orders";
const ENTITY_STRATEGY_STATUS = "strategy_status";

const DOMAIN_BINARY_SENSOR = "binary_sensor";
const DOMAIN_BUTTON = "button";
const DOMAIN_SENSOR = "sensor";

const LOCALIZE_PATTERN = /_\([^)]*\)/g;

const ENTITY_CARD_BASE = {
  type: "custom:mushroom-entity-card",
  layout: "vertical",
  primary_info: "state",
  secondary_info: "name",
  icon_color: "orange"
}

const translate = (hass, text: String) => {
  return text.replace(
    LOCALIZE_PATTERN,
    (key) => hass.localize(key.substring(2, key.length - 1)) || key
  );
};

// const time_units = [
//   { name: 'year', secs: 31536000 },
//   { name: 'month', secs: 2592000 },
//   { name: 'week', secs: 604800 },
//   { name: 'day', secs: 86400 },
//   { name: 'hour', secs: 3600 },
//   { name: 'minute', secs: 60 },
//   { name: 'second', secs: 1 }
// ];

// const calculateTimeDifference = (time: number) => {
//   for (let { name, secs } of time_units) {
//     const interval = Math.floor(time / secs);
//     if (interval >= 1) {
//       return {
//         interval: interval,
//         unit: name
//       };
//     }
//   }
//   return {
//     interval: 0,
//     unit: ''
//   };
// };

// const timeAgo = (date: string | number | Date) => {
//   const time = Math.floor(
//     (new Date().valueOf() - new Date(date).valueOf()) / 1000
//   );
//   const { interval, unit } = calculateTimeDifference(time);
//   const suffix = interval === 1 ? '' : 's';
//   return `${interval} ${unit}${suffix} ago`;
// };

const stateColourBinarySensor = (stateObj) => {
  return stateObj.state == "on"
    ? "orange"
    : "var(--state-inactive-color)";
};

const stateIconBinarySensor = (stateObj) => {
  return stateObj.state == "on"
    ? "mdi:check-circle"
    : "mdi:circle-outline";
};

const shouldRenderSensor = (stateObj) => {
  return stateObj.state != "unavailable" && stateObj.state != "unknown";
};

const stateColourSensor = (stateObj) => {
  return shouldRenderSensor(stateObj)
    ? "orange"
    : "var(--state-inactive-color)";
};

const extract_assets = (trading_pair) => {
  const currency_data = trading_pair.split("-");

  return [currency_data[0], currency_data[1]];
};

interface extraStateInfo {
  state: string;
  unit?: string;
}

interface infoBoxParams {
  entityId?: string;
  title: string;
  icon: string;
  styles: any;
  stateObj: any;
  domain: string;
  extra_state_info?: extraStateInfo;
  clickable?: boolean;
}

interface specialSensorBoxParams {
  title: string;
  icon: string;
  stateObj: any;
  extra_state_info: extraStateInfo;
}

interface buttonBoxParams {
  entity: string;
  name: string;
  icon?: string;
  tap_action?: any;
}

class HummingbotCard extends LitElement {
  @property() _config;
  @property() _hass;
  @property() _hb_base;
  @property() _known_root_id;
  @property() _instance_id;
  @property() config; // Rendered configuration of the row to display
  @property() _action;
  @property() _card_button_import;
  @property() _card_button_start;
  @property() _card_button_stop;
  @property() _card_strategy_name_input;
  @property() _strategy_name_input_id;
  @property() _strategy_name_input_state = "";

  static getConfigElement() {
    return document.createElement("hummingbot-card-editor");
  }

  static getStubConfig(hass, _, __) {
    console.log("stub");
    let entity = "";

    for (const eid of Object.keys(hass.states)) {
      if (eid.includes(`${DOMAIN_SENSOR}.${ENTITY_PREFIX}`) && eid.includes(ENTITY_STRATEGY_STATUS)) {
        entity = eid;
        break;
      }
    }

    console.log(entity);
    return { type: "custom:hummingbot-card", hummingbot_entity: entity }
  }

  setConfig(config) {
    this._config = { ...config };
    this.config = { ...this._config };

    for (const k of OPTIONS) {
      if (!this._config[k]) continue;
      if (hasTemplate(this._config[k])) {
        bind_template(
          (res) => {
            const state = { ...this.config };
            if (typeof res === "string") res = translate(hass(), res);
            state[k] = res;
            this.config = state;
          },
          this._config[k],
          { config }
        );
      } else if (typeof this._config[k] === "string") {
        this.config[k] = translate(hass(), this._config[k]);
      }
    }
  }

  firstUpdated() {
    console.log("updated");
    this._loadCards();
  }

  private _binary_sensor_entity(ent) {
    return `${DOMAIN_BINARY_SENSOR}.${ENTITY_PREFIX}${this._hb_base}_${ent}`
  }

  private _sensor_entity(ent) {
    return `${DOMAIN_SENSOR}.${ENTITY_PREFIX}${this._hb_base}_${ent}`
  }

  private _button_entity(ent) {
    return `${DOMAIN_BUTTON}.${ENTITY_PREFIX}${this._hb_base}_${ent}`
  }

  private _loadCards() {
    if (this._hb_base && this._known_root_id == this.config.hummingbot_entity) return;
    if (!this._hass) return;
    if (!this.config) return;

    console.info("load hb card");

    this._known_root_id = this.config.hummingbot_entity;

    this._hb_base =
      this.config.hummingbot_entity && (
        (this.config.hummingbot_entity.indexOf(ENTITY_PREFIX) >= 0) &&
        (this.config.hummingbot_entity.indexOf(`_${ENTITY_STRATEGY_STATUS}`) >= 0)
      )
        ? this.config.hummingbot_entity.split(ENTITY_PREFIX)[1].split(`_${ENTITY_STRATEGY_STATUS}`)[0]
        : undefined;

    this._instance_id = this._hass.states[this._sensor_entity(ENTITY_STRATEGY_STATUS)]?.attributes?.instance_id;
    this._strategy_name_input_state = this._hass.states[this._sensor_entity(ENTITY_STRATEGY_STATUS)]?.attributes?.last_imported_strategy ?? "";

    this._card_button_import = undefined;
  }

  private _handleClick(entityId): void {
    moreInfo(entityId);
  }

  private _handleImportClick(ev): void {
    console.log("clicked");
  }

  private _render_info_box(params: infoBoxParams) {
    let state_info = html``;
    if (params.extra_state_info && shouldRenderSensor(params.stateObj)) {
      state_info = html`
      <div class="sensor-box state-info">
        <div class="state">${params.extra_state_info.state}</div>
        ${params.extra_state_info.unit ? html`
        <div class="state-unit">${params.extra_state_info.unit}</div>
        ` : ""}
      </div>
      `
    }
    const click_fn = params.clickable
      ? () => this._handleClick(params.entityId)
      : undefined;

    return html`
    <ha-card @click=${click_fn}>
      <div class="${classMap({ "sensor-box": true, "sensor-heading": (params.extra_state_info ? true : false) })}">
        <div class="sensor-title">${params.title}</div>
        <div class="sensor-icon">
          <ha-state-icon
            .icon=${params.icon}
            .state=${params.stateObj}
            data-domain=${ifDefined(params.domain)}
            data-state=${params.stateObj.state}
            style=${params.styles}
          ></ha-state-icon>
        </div>
      </div>
      ${state_info}
    </ha-card>
    `;
  }

  private _create_button_box(params: buttonBoxParams) {
    const default_tap_action = {
      action: "toggle"
    };

    const el = createCard({
      type: "entity-button",
      tap_action: params.tap_action ?? default_tap_action,
      name: params.name,
      entity: params.entity,
      icon: params.icon
    });
    el.hass = this._hass;

    return el
  }

  private _render_import_button() {
    const btnConfig = {
      entity: this._button_entity(ENTITY_STRATEGY_IMPORT),
      icon: "mdi:import",
      name: "Import",
      tap_action: {
        action: "call-service",
        service: "hummingbot.import_strategy",
        data: {
          instance_id: this._instance_id,
          strategy_name: this._strategy_name_input_state
        }
      }
    }
    if (this._card_button_import) {
      this._card_button_import.setConfig(btnConfig);
      return this._card_button_import
    };

    this._card_button_import = this._create_button_box(btnConfig);
  }

  private _render_start_button() {
    if (this._card_button_start) return this._card_button_start;

    this._card_button_start = this._create_button_box({
      entity: this._button_entity(ENTITY_STRATEGY_START),
      icon: "mdi:play",
      name: "Start"
    });
  }

  private _render_stop_button() {
    if (this._card_button_stop) return this._card_button_stop;

    this._card_button_stop = this._create_button_box({
      entity: this._button_entity(ENTITY_STRATEGY_STOP),
      icon: "mdi:stop",
      name: "Stop"
    });
  }

  private _render_binary_sensor_box(title, stateObj) {
    const styles = styleMap({
      color: stateColourBinarySensor(stateObj),
    });
    return this._render_info_box({
      title,
      icon: stateIconBinarySensor(stateObj),
      styles,
      stateObj,
      domain: DOMAIN_BINARY_SENSOR
    });
  }

  private _render_sensor_box(title, icon, stateObj) {
    const styles = styleMap({
      color: stateColourSensor(stateObj),
    });
    return this._render_info_box({
      title,
      icon,
      styles,
      stateObj,
      domain: DOMAIN_SENSOR,
      extra_state_info: {
        state: stateObj.state
      }
    });
  }

  private _render_special_sensor_box(params: specialSensorBoxParams) {
    const styles = styleMap({
      color: stateColourSensor(params.stateObj),
    });
    return this._render_info_box({
      title: params.title,
      icon: params.icon,
      styles,
      stateObj: params.stateObj,
      domain: DOMAIN_SENSOR,
      extra_state_info: params.extra_state_info
    });
  }

  private _get_orders_list(orders_state) {
    const order_ids = orders_state?.attributes.orders ? Object.keys(orders_state.attributes.orders) : undefined;

    return order_ids && order_ids.length > 0
      ? order_ids.map((order_id) => ({
        ...orders_state.attributes.orders[order_id],
        oid: order_id
      }))
      : undefined;
  }

  private _get_state_order_amount(orders) {
    if (!orders) {
      return "No Active Orders";
    }

    let orders_sum = 0;

    for (const order of orders) {
      orders_sum += Number(order.a);
    }

    return `${orders_sum}`;
  }

  private _render_orders(orders) {
    if (!orders || !orders.length) {
      return "";
    }

    const [base_unit, quote_unit] = extract_assets(orders[0].tp);

    return orders.map((order) => {
      // const order_age = timeAgo(order.ts * 1000);

      return html`
      <div class="order-info hb-grid cols-2">
        <div>${order.a} <span class="order-unit">${base_unit}</span></div>
        <div>${order.p} <span class="order-unit">${quote_unit}</span></div>
      </div>
      `
    });
  }

  private _strategy_name_input_changed(ev): void {
    const newValue = ev.target.value;
    this._strategy_name_input_state = newValue;
    console.log(this._strategy_name_input_state);
  }

  private _render_strategy_name_text_box() {
    return html`
    <ha-card class="text-field-card">
      <ha-textfield
        .label=${"Strategy Name"}
        .value=${this._strategy_name_input_state}
        @change=${this._strategy_name_input_changed}
        placeholder="Strategy Name"
      >/ha-textfield>
    </ha-card>
    `
  }

  private _render_content() {
    const state_running = this._hass.states[this._binary_sensor_entity(ENTITY_STRATEGY_RUNNING)];
    const state_imported = this._hass.states[this._binary_sensor_entity(ENTITY_STRATEGY_IMPORTED)];
    const state_strategy_status = this._hass.states[this._sensor_entity(ENTITY_STRATEGY_STATUS)];
    const strategy_status_attributes = state_strategy_status?.attributes;
    const state_active_orders = this._hass.states[this._sensor_entity(ENTITY_STRATEGY_ACTIVE_ORDERS)];
    const orders = this._get_orders_list(state_active_orders);
    const buy_orders = orders ? orders.filter((o) => o.s == "buy") : undefined;
    const sell_orders = orders ?orders.filter((o) => o.s == "sell") : undefined;
    const state_order_sum = this._get_state_order_amount(orders)
    return html`
    <div class="hb-grid cols-1">
      ${this._render_strategy_name_text_box()}
    </div>
    <div class="hb-grid cols-3">
      ${this._render_import_button()}
      ${this._render_start_button()}
      ${this._render_stop_button()}
    </div>
    <div class="hb-grid cols-2">
      ${this._render_binary_sensor_box("Strategy Running", state_running)}
      ${this._render_binary_sensor_box("Strategy Imported", state_imported)}
    </div>
    ${strategy_status_attributes.asset_base ? html`
    <div class="hb-grid cols-2">
      ${this._render_special_sensor_box({
        title: "Base Asset",
        icon: "mdi:bitcoin",
        stateObj: state_strategy_status,
        extra_state_info: {
          state: strategy_status_attributes?.asset_base
        }
      })}
      ${this._render_special_sensor_box({
        title: "Quote Asset",
        icon: "mdi:currency-usd",
        stateObj: state_strategy_status,
        extra_state_info: {
          state: strategy_status_attributes?.asset_quote
        }
      })}
    </div>
    ` : ""}
    ${state_active_orders.state != 'unknown' && state_active_orders.state != 'unavailable' && state_running?.state == 'on' ? html`
    <div class="hb-grid cols-2">
      ${this._render_sensor_box("Active Orders", "mdi:reorder-horizontal", state_active_orders)}
      ${this._render_special_sensor_box({
        title: "Amount In Orders",
        icon: "mdi:bitcoin",
        stateObj: state_active_orders,
        extra_state_info: {
          state: state_order_sum,
          unit: strategy_status_attributes?.asset_base
        }
      })}
    </div>
    ` : ""}
    ${(strategy_status_attributes?.balances?.total.base ?? 0) > 0 ? html`
    <div class="hb-grid cols-2">
      ${this._render_special_sensor_box({
        title: "Available Balance",
        icon: "mdi:cash",
        stateObj: state_strategy_status,
        extra_state_info: {
          state: strategy_status_attributes.balances?.available.base,
          unit: strategy_status_attributes?.asset_base
        }
      })}
      ${this._render_special_sensor_box({
        title: "Total Balance",
        icon: "mdi:cash",
        stateObj: state_strategy_status,
        extra_state_info: {
          state: strategy_status_attributes.balances?.total.base,
          unit: strategy_status_attributes?.asset_base
        }
      })}
    </div>
    ` : ""}
    ${(strategy_status_attributes?.market_prices?.bid ?? 0) > 0 ? html`
    <div class="hb-grid cols-3">
      ${this._render_special_sensor_box({
        title: "Bid Price",
        icon: "mdi:cash",
        stateObj: state_strategy_status,
        extra_state_info: {
          state: strategy_status_attributes.market_prices?.bid,
          unit: strategy_status_attributes?.asset_quote
        }
      })}
      ${this._render_special_sensor_box({
        title: "Ask Price",
        icon: "mdi:cash",
        stateObj: state_strategy_status,
        extra_state_info: {
          state: strategy_status_attributes.market_prices?.ask,
          unit: strategy_status_attributes?.asset_quote
        }
      })}
      ${this._render_special_sensor_box({
        title: "Mid Price",
        icon: "mdi:cash",
        stateObj: state_strategy_status,
        extra_state_info: {
          state: strategy_status_attributes.market_prices?.mid,
          unit: strategy_status_attributes?.asset_quote
        }
      })}
    </div>
    ` : ""}
    ${orders ? html`
      <div class="hb-grid cols-2">
        <ha-card class="orders-list">
          <div class="header"><div class="order-list-heading">Buy Orders</div></div>
          <div class="content">${this._render_orders(buy_orders)}</div>
        </ha-card>
        <ha-card class="orders-list">
          <div class="header"><div class="order-list-heading">Sell Orders</div></div>
          <div class="content">${this._render_orders(sell_orders)}</div>
        </ha-card>
      </div>` : ""}
    `;
  }

  private _render_offline() {
    return html`
    <div class="hb-grid cols-1">
      <ha-card>
        <div class="sensor-box sensor-heading offline">
          <div class="sensor-title offline">Offline</div>
        </div>
      </ha-card
    </div>
    `;
  }

  private _check_availability() {
    if (!this._hb_base) return false;

    const run_state = this._hass.states[this._binary_sensor_entity(ENTITY_STRATEGY_RUNNING)];

    if (!run_state || run_state.state == 'unavailable' || run_state.state == 'unknown') return false;

    return true;

  }

  render() {
    return html`
    <div id="root">
      <ha-card class="wrapper">
        <div class="header">
          <h1 class="card-title">Hummingbot ${this._instance_id}</h1>
        </div>
        <div class="content">
          ${this._check_availability() ? this._render_content() : this._render_offline()}
        </div>
      </ha-card>
    </div>
    `;
  }

  set hass(hass) {
    this._hass = hass;
    if (this._card_button_import) this._card_button_import.hass = hass;
    if (this._card_button_start) this._card_button_start.hass = hass;
    if (this._card_button_stop) this._card_button_stop.hass = hass;
    if (this._card_strategy_name_input) this._card_strategy_name_input.hass = hass;
  }

  static get styles() {
    return [
      (customElements.get("hui-generic-entity-row") as any)?.styles,
      css`
        :host {
          display: inline;
        }

        .wrapper {
          background: none;
        }

        ha-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          outline: none;
          width: 100%;
        }

        .card-title {
          color: var(--ha-card-header-color,--primary-text-color);
          font-size: 24px;
          line-height: 1.2;
        }

        .header {
          display: flex;
          padding: 8px 8px 0;
          justify-content: space-between;
        }

        .content {
          display: grid;
          padding: 8px 4px 0;
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }

        .orders-list .content {
          padding: 4px 16px 8px;
        }

        .sensor-box {
          display: flex;
          justify-content: space-between;
          padding: 8px 16px;
        }

        .sensor-title, .order-list-heading {
          color: var(--secondary-text-color);
          line-height: 30px;
          font-weight: 500;
          font-size: 16px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .order-unit, .state-unit {
          color: var(--secondary-text-color);
          font-weight: 500;
          font-size: 10px;
        }

        .sensor-icon {
          color: var(--paper-item-icon-color, #44739e);
          line-height: 30px;
        }

        .hb-grid {
          display: grid;
          grid-gap: var(--grid-card-gap, 8px);
          padding: 0px 0px 4px 0px;
          width: 100%;
        }

        .hb-grid.cols-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .hb-grid.cols-3 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .grid-break {
          flex-basis: 100%;
          width: 0;
        }

        .state {
          font-size: 22px;
          font-weight: 600;
          line-height: 1.5;
          text-align: center;
          width: 100%;
        }

        .sensor-box.sensor-heading {
          padding: 0px 16px 0px;
        }

        .sensor-box.sensor-heading.offline {
          padding: 30px;
        }

        .sensor-title.offline {
          font-size: 20px;
          text-align: center;
          width: 100%;
        }

        .sensor-box.state-info {
          padding: 0px 16px 8px;
        }

        .text-field-card {
          padding: 8px 16px
        }
      `,
    ];
  }
}

if (!customElements.get("hummingbot-card")) {
  customElements.define("hummingbot-card", HummingbotCard);
  (window as any).customCards = (window as any).customCards || [];
  (window as any).customCards.push({
    type: "hummingbot-card",
    name: "Hummingbot Card",
    preview: true,
    description: "Hummingbot Card.",
  });
  console.info(
    `%cHUMMINGBOT-CARD ${pjson.version} IS INSTALLED`,
    "color: green; font-weight: bold",
    ""
  );
}

const SCHEMA = [
  {
    name: "hummingbot_entity",
    selector: {
      entity: {
        domain: "sensor",
        integration: "hummingbot",
        device_class: "enum"
      }
    }
  },
] as const;

class HummingbotCardEditor extends LitElement {
  @property() _config;
  @property() hass;

  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }

  setConfig(config) {
    this._config = config;
  }

  _valueChanged(ev) {

    const _config = ev.detail.value;
    this._config = _config;

    const event = new CustomEvent("config-changed", {
      detail: { config: _config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const data = {
      ...this._config,
    };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${SCHEMA}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}

customElements.define("hummingbot-card-editor", HummingbotCardEditor);
