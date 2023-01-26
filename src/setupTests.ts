import 'jest-canvas-mock';
import '@testing-library/jest-dom';

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

const windowMock = {
  scrollTo: jest.fn(),
};

Object.assign(global, global, windowMock);
