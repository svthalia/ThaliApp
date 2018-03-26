/* global jest */
import React from 'react';

const reacti18next = jest.genMockFromModule('react-i18next');

const translate = () => Component => props => <Component t={s => s} {...props} />;

reacti18next.translate = translate;

module.exports = reacti18next;
