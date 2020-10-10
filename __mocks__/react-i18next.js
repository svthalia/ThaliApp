/* global jest */
import React from 'react';

const reacti18next = jest.genMockFromModule('react-i18next');

const withTranslation = () => Component => props => <Component t={s => s} {...props} />;

reacti18next.withTranslation = withTranslation;

module.exports = reacti18next;
