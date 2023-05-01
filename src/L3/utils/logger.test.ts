const logger = {
  debug: jest.fn(),
  log: jest.fn(),
};

// trying to mock createLogger to return a specific logger instance
jest.mock("winston", () => ({
  format: {
    colorize: jest.fn(),
    combine: jest.fn(),
    label: jest.fn(),
    timestamp: jest.fn(),
    printf: jest.fn(),
  },
  createLogger: jest.fn().mockReturnValue(logger),
  transports: {
    Console: jest.fn(),
  },
}));

import * as winston from "winston";

describe("logger", () => {
  let loggerMock: winston.Logger;
  it("should initialize logger", () => {
        const mockCreateLogger = jest.spyOn(winston, "createLogger");
        loggerMock = mockCreateLogger.mock.instances[0];
        expect(logger).toBeDefined();
        
        logger.log("debug", "test log debug");
        expect(logger.log).toHaveBeenCalled();
    
        logger.debug("debug message");
        expect(logger.debug).toHaveBeenCalledTimes(1); // <- here
        
        // expect(mockCreateLogger).toHaveBeenCalledTimes(1); // <- here
  })
});
