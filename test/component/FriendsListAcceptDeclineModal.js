var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    FriendsListAcceptDeclineModal = require('../../react_components/FriendsListAcceptDeclineModal.jsx');

describe('FriendsListAcceptDeclineModal', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(FriendsListAcceptDeclineModal));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a Dialog', function() {
    assert(this.component.type == mui.Dialog);
  });

});
