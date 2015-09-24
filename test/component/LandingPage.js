var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    CenterOnPage = require('../../app/components/CenterOnPage.jsx'),
    Logo = require('../../app/components/Logo.jsx'),
    LandingPage = require('../../app/components/LandingPage.jsx');

describe('LandingPage', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(LandingPage));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a CenterOnPage', function() {
    assert(this.component.type == CenterOnPage);
  });

  it('should render a Logo', function() {
    assert(this.component.props.children.type == Logo);
  });

});
