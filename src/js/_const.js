'use strict';

const activeClass    = 'is-active';
const collapsedClass = 'is-collapsed';
const disabledClass  = 'is-disabled';
const expandedClass  = 'is-expanded';
const fixedClass     = 'is-fixed';
const focusClass     = 'is-focused';
const hoverClass     = 'is-hover';
const invisibleClass = 'is-invisible';
const selectedClass  = 'is-selected';
const scrolledClass  = 'is-scrolled';
const visibleClass   = 'is-visible';

const headerFixedClass  =  'header-is-fixed';
const lockedScrollClass =  'scroll-is-locked';
const lockedScrollClass2 = 'locked-scroll';
const menuVisibleClass  =  'menu-is-visible';

const aosDuration  = 250;

const $navbar = $('[data-component="navbar"]');
const $body = $('.body');
const $main = $('.main');

const bpSM = 560;
const bpMD = 768;
const bpLG = 1024;
const bpXL = 1232;
const bp2XL = 1440;
