var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    TextField = mui.TextField,
    Friends = require('../../app/components/Friends.jsx'),
    ChatPage = require('../../app/components/ChatPage.jsx');

describe('ChatPage', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(ChatPage));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a div', function() {
    assert(this.component.type == 'div');
  });


  // this could have more tests but its really complex and I dont want to write them right noe
});
