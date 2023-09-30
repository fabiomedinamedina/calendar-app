module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [],
  modulePathIgnorePatterns: ["mocks"],
  
  // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
  // moduleNameMapper: {
  //     '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js',
  // },
}