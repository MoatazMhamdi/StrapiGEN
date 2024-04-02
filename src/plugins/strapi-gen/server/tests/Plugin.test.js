/*const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

// Replace with your actual controller path
const Plugin = require('../controllers/Plugin');

expect.use(sinonChai); // Add sinon-chai for extended assertions

describe('your-plugin generatePostCode', () => {
  it('should return generated code snippet', async () => {
    const mockCtx = {
      send: sinon.stub().resolves(), // Mock the send method
    };

    await Plugin.generatePostCode(mockCtx);

    expect(mockCtx.send).calledOnceWith({
      message: 'Generated code snippet for POST method:',
      code: sinon.match.string, // Use `sinon.match.string` for dynamic content
    });
  });
});
*/