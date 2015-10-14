var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    List = mui.List,
    Paper = mui.Paper,
    Friends = require('../../app/components/Friends.jsx'),
    DeleteFriendModal = require('../../app/components/DeleteFriendModal.jsx');

describe('Friends', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Friends));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a div', function() {
    assert(this.component.type == 'div');
  });

  it('should render DeleteFriendModal inside that div', function() {
    assert(this.component.props.children[0].type == DeleteFriendModal);
  });

  it('should render a List inside that div', function() {
    assert(this.component.props.children[2].type == List);
  });

  it('should contain a Paper', function() {
    assert(this.component.props.children[2].props.children.type == Paper);
  });

});
