var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    Paper = mui.Paper,
    Messages = require('../../app/components/Messages.jsx'),
    ChatBox = require('../../app/components/ChatBox.jsx');

describe('Messages', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Messages));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a Paper', function() {
    assert(this.component.type == Paper);
  });

  it('should contain a ul as its first child', function() {
    assert(this.component.props.children.type == 'ul');
  });

});
