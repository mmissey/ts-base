import 'isomorphic-fetch';

const ReactDOM = require('react-dom');

function Headers(config) {
  this.get = (key) => config[key];
}

global.Headers = Headers;

// TODO: ts-jest can't handle const enums.
//       maybe in a different version.
global.MyConstEnum = { }


beforeAll(() => {
  ReactDOM.createPortal = jest.fn((element) => element);
});

afterAll(() => {
  ReactDOM.createPortal.mockClear();
});
