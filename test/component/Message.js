var React = require('react/addons'),
    assert = require('assert'),
    Message = require('../../app/components/Message.jsx'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui');

describe('Message', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Message));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a li', function() {
    assert(this.component.type == 'li');
  });

});
