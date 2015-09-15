var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    SignIn = require('../../react_components/SignIn.jsx');

describe('SignIn', function() {
    before('testing', function() {
        var shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(React.createElement(SignIn));
        this.component = shallowRenderer.getRenderOutput();
    });

    it('should render a Google SignIn Button', function() {
        assert(this.component.type == 'div');
    });
});
