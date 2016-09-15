import testkit from 'wix-bootstrap-testkit';
import configEmitter from 'wix-config-emitter';

let started = false;

export const app = bootstrapServer();

export const start = function () {
  beforeEach(() => {
    if (started === false) {
      return emitConfigs()
        .then(() => app.start())
        .then(() => started = true);
    }
  });

  afterEach(() => {
    if (started === true) {
      return app.stop()
        .then(() => started = false);
    }
  });
};

function emitConfigs() {
  return configEmitter({sourceFolders: ['./templates'], targetFolder: './target/configs'})
    .fn('static_url', 'com.wixpress.carmel.carmel-ben-todo', {schemaless: true}, 'http://localhost:3200/')
    .emit();
}

function bootstrapServer() {
  return testkit.app('./index', {
    env: {
      PORT: 3100,
      MANAGEMENT_PORT: 3104,
      NEW_RELIC_LOG_LEVEL: 'warn',
      DEBUG: ''
    }
  });
}
