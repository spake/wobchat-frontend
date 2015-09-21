var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    FriendsListAddBox = require('../../react_components/FriendsListAddBox.jsx');

describe('FriendsListAddBox', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(FriendsListAddBox));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a div', function() {
    assert(this.component.type == 'div');
  });

  // it('should contain a textfield as its first item', function() {
  //   assert(this.component.props.children[0].type == mui.TextField);
  // });
  //
  // it('should contain a List as its second item', function() {
  //   assert(this.component.props.children[1].type == mui.List);
  // });

});
