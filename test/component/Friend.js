var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    Friend = require('../../app/components/Friend.jsx');

describe('Friend', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Friend));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a ListItem', function() {
    assert(this.component.type == mui.ListItem);
  });

});
