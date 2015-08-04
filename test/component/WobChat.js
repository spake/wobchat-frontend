var React = require('react/addons'),
    assert = require('assert'),
    WobChat = require('../../react_components/WobChat.jsx'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui');

describe('WobChat', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(WobChat));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render an AppBar', function() {
    assert(this.component.props.children[0].type == mui.AppBar);
  });

  it('should render a RaisedButton', function() {
    assert(this.component.props.children[1].type == mui.RaisedButton);
  });

  it('should have the label "Chat"', function() {
    console.log(this.component.props.children[1]);
    assert(this.component.props.children[1].props.label == 'Chat');
  });

});
