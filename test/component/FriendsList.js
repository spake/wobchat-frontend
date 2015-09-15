var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    FriendsList = require('../../react_components/FriendsList.jsx');

describe('FriendsList', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(FriendsList));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a List', function() {
    assert(this.component.type == mui.List);
  });

});
