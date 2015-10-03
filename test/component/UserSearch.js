var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    TextField = mui.TextField,
    List = mui.List,
    Paper = mui.Paper,
    User = require('../../app/components/User.jsx'),
    UserSearch = require('../../app/components/UserSearch.jsx');

describe('UserSearch', function() {
    before('testing', function() {
        var shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(React.createElement(UserSearch));
        this.component = shallowRenderer.getRenderOutput();
    });

    it('should render a List', function() {
        assert(this.component.type == List);
    });

    it('should render Paper', function() {
        assert(this.component.props.children.type == Paper);
    });

});
