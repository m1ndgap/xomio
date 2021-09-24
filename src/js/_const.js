'use strict';

const activeClass    = 'is-active';
const fixedClass     = 'is-fixed';
const focusClass     = 'is-focused';
const hoverClass     = 'is-hover';
const disabledClass  = 'is-disabled';
const visibleClass   = 'is-visible';
const invisibleClass = 'is-invisible';
const expandedClass  = 'is-expanded';
const selectedClass  = 'is-selected';
const collapsedClass = 'is-collapsed';
const scrolledClass  = 'is-scrolled';
const headerFixedClass  = 'header-is-fixed';
const lockedScrollClass = 'scroll-is-locked';
const modalVisibleClass      = 'modal-is-visible';
const mobileMenuVisibleClass = 'mobile-menu-is-visible';
const asideMenuVisibleClass  = 'aside-menu-is-visible';

const $header = $('[data-component="header"]');
const $body = $('.body');
const $main = $('.main');

const bpSM = 576;
const bpMD = 768;
const bpLG = 1024;
const bpXL = 1248;
const bp2Xl = 1440;
