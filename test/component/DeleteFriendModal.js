var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    DeleteFriendModal = require('../../app/components/DeleteFriendModal.jsx'),
    Dialog = mui.Dialog;

describe('DeleteFriendModal', function() {
    before('testing', function() {
        var shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(React.createElement(DeleteFriendModal));
        this.component = shallowRenderer.getRenderOutput();
    });

    it('should render a Dialog', function() {
        assert(this.component.type == Dialog);
    });
});
