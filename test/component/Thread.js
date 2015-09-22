var React = require('react/addons'),
    assert = require('assert'),
    Thread = require('../../react_components/Thread.jsx'),
    ChatBox = require('../../react_components/ChatBox.jsx'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    Paper = mui.Paper;

describe('Thread', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Thread));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a Paper', function() {
    assert(this.component.type == Paper);
  });

  it('should contain a ul as its first child', function() {
    assert(this.component.props.children[0].type == 'ul');
  });

  it('should contain a ChatBox as its second child', function() {
    assert(this.component.props.children[1].type == ChatBox);
  });

});
