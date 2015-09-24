import 'array.prototype.findindex';
import React from 'react';
import Router from './components/Router.jsx';
import alt from './libs/alt';
import storage from './libs/storage';
import persist from './libs/persist';

main();

function main() {
  React.render(<Router />, document.body);
}
