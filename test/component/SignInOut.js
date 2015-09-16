var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    SignInOut = require('../../react_components/SignInOut.jsx');

describe('SignInOut', function() {
    before('testing', function() {
        var shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(React.createElement(SignInOut));
        this.component = shallowRenderer.getRenderOutput();
    });

    it('should render a RaisedButton', function() {
        assert(this.component.type == mui.RaisedButton);
    });
});
