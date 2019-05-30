/* global jest */
import React from 'react';

const reacti18next = jest.genMockFromModule('react-i18next');

const withTranslation = () => Component => props => <Component t={s => s} {...props} />;

reacti18next.withTranslation = withTranslation;
reacti18next.initReactI18next = {};

module.exports = reacti18next;
