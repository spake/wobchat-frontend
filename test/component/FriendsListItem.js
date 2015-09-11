var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    FriendsListItem = require('../../react_components/FriendsListItem.jsx');

describe('FriendsListItem', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(FriendsListItem));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a ListItem', function() {
    assert(this.component.type == mui.ListItem);
  });

});
