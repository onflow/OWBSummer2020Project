const NODE_ENV = process.env.NODE_ENV;
const FLOW_CONFIG = process.env.FLOW_CONFIG;

// const config = FLOW_CONFIG[NODE_ENV];
const config = FLOW_CONFIG["production"];

export default config;
