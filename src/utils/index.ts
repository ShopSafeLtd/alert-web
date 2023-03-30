/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NavItem } from 'configs/NavigationConfig';

function cutHex(h: string) {
  return h.charAt(0) === '#' ? h.slice(1, 7) : h;
}

function hexToR(h: string) {
  return Number.parseInt(cutHex(h).slice(0, 2), 16);
}

function hexToG(h: string) {
  return Number.parseInt(cutHex(h).slice(2, 4), 16);
}

function hexToB(h: string) {
  return Number.parseInt(cutHex(h).slice(4, 6), 16);
}

const trim = (str: string) => str.replace(/^\s+|\s+$/gm, '');

const Utils = {
  /**
   * Get first character from first & last sentences of a username
   * @param {String} name - Username
   * @return {String} 2 characters string
   */
  getNameInitial(name: string) {
    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  },

  /**
   * Get current path related object from Navigation Tree
   * @param {Array} navTree - Navigation Tree from directory 'configs/NavigationConfig'
   * @param {String} path - Location path you looking for e.g '/app/dashboards/analytic'
   * @return {Object} object that contained the path string
   */
  getRouteInfo(navTree: NavItem[], path: string): NavItem {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return navTree.find((route) => path.includes(route.path))!;
  },

  /**
   * Get accessible color contrast
   * @param {String} hex - Hex color code e.g '#3e82f7'
   * @return {String} 'dark' or 'light'
   */
  getColorContrast(hex: string): 'light' | 'dark' {
    if (!hex) {
      return 'dark';
    }

    const threshold = 130;
    const hRed = hexToR(hex);
    const hGreen = hexToG(hex);
    const hBlue = hexToB(hex);

    const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;
    if (cBrightness > threshold) {
      return 'dark';
    }
    return 'light';
  },

  /**
   * Darken or lighten a hex color
   * @param {String} color - Hex color code e.g '#3e82f7'
   * @param {Number} percent - Percentage -100 to 100, positive for lighten, negative for darken
   * @return {String} Darken or lighten color
   */
  shadeColor(color: string, percent: number) {
    let R = Number.parseInt(color.slice(1, 3), 16);
    let G = Number.parseInt(color.slice(3, 5), 16);
    let B = Number.parseInt(color.slice(5, 7), 16);
    R = Number.parseInt(`${(R * (100 + percent)) / 100}`, 10);
    G = Number.parseInt(`${(G * (100 + percent)) / 100}`, 10);
    B = Number.parseInt(`${(B * (100 + percent)) / 100}`, 10);
    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;
    const RR =
      R.toString(16).length === 1 ? `0${R.toString(16)}` : R.toString(16);
    const GG =
      G.toString(16).length === 1 ? `0${G.toString(16)}` : G.toString(16);
    const BB =
      B.toString(16).length === 1 ? `0${B.toString(16)}` : B.toString(16);
    return `#${RR}${GG}${BB}`;
  },

  /**
   * Convert RGBA to HEX
   * @param {String} rgba - RGBA color code e.g 'rgba(197, 200, 198, .2)')'
   * @return {String} HEX color
   */
  rgbaToHex(rgba: string) {
    const inParts = rgba.slice(Math.max(0, rgba.indexOf('('))).split(',');
    const r = Number.parseInt(trim(inParts[0].slice(1)), 10);
    const g = Number.parseInt(trim(inParts[1]), 10);
    const b = Number.parseInt(trim(inParts[2]), 10);
    const a = Number.parseInt(
      Number.parseFloat(
        trim(inParts[3].slice(0, Math.max(0, inParts[3].length - 1)))
      ).toFixed(2),
      10
    );
    const outParts = [
      r.toString(16),
      g.toString(16),
      b.toString(16),
      Math.round(a * 255)
        .toString(16)
        .slice(0, 2),
    ];

    // eslint-disable-next-line no-restricted-syntax
    for (const [i, part] of outParts.entries()) {
      if (part.length === 1) {
        outParts[i] = `0${part}`;
      }
    }
    return `#${outParts.join('')}`;
  },

  /**
   * Returns either a positive or negative
   * @param {Number} number - number value
   * @param {any} positive - value that return when positive
   * @param {any} negative - value that return when negative
   * @return {any} positive or negative value based on param
   */
  getSignNum(number: number, positive: any, negative: any) {
    if (number > 0) {
      return positive;
    }
    if (number < 0) {
      return negative;
    }
    return null;
  },

  /**
   * Returns either ascending or descending value
   * @param {Object} a - antd Table sorter param a
   * @param {Object} b - antd Table sorter param b
   * @param {String} key - object key for compare
   * @return {any} a value minus b value
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  antdTableSorter(a: any, b: any, key: string) {
    if (typeof a[key] === 'number' && typeof b[key] === 'number') {
      return a[key] - b[key];
    }

    if (typeof a[key] === 'string' && typeof b[key] === 'string') {
      a = a[key].toLowerCase();
      b = b[key].toLowerCase();
      if (a > b) return -1;
      if (b > a) return 1;
      return 0;
    }
    return 0;
  },

  /**
   * Filter array of object
   * @param {Array} list - array of objects that need to filter
   * @param {String} key - object key target
   * @param {any} value  - value that excluded from filter
   * @return {Array} a value minus b value
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  filterArray(list: any[], key: string, value: any) {
    let data = list;
    if (list) {
      data = list.filter((item) => item[key] === value);
    }
    return data;
  },

  /**
   * Remove object from array by value
   * @param {Array} list - array of objects
   * @param {String} key - object key target
   * @param {any} value  - target value
   * @return {Array} Array that removed target object
   */
  deleteArrayRow(list: any[], key: string, value: any) {
    let data = list;
    if (list) {
      data = list.filter((item) => item[key] !== value);
    }
    return data;
  },

  /**
   * Wild card search on all property of the object
   * @param {Number | String} input - any value to search
   * @param {Array} list - array for search
   * @return {Array} array of object contained keyword
   */
  wildCardSearch(list: any[], input: number | string) {
    // eslint-disable-next-line consistent-return
    const searchText = (item: any) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in item) {
        if (item[key] == null) {
          // eslint-disable-next-line no-continue
          continue;
        }
        if (
          item[key]
            .toString()
            .toUpperCase()
            .includes(input.toString().toUpperCase())
        ) {
          return true;
        }
      }
    };
    list = list.filter((value) => searchText(value));
    return list;
  },

  /**
   * Get Breakpoint
   * @param {Object} screens - Grid.useBreakpoint() from antd
   * @return {Array} array of breakpoint size
   */
  getBreakPoint(screens: any) {
    const breakpoints = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const key in screens) {
      // eslint-disable-next-line no-prototype-builtins
      if (screens.hasOwnProperty(key)) {
        const element = screens[key];
        if (element) {
          breakpoints.push(key);
        }
      }
    }
    return breakpoints;
  },
};

export enum LocalStorageKeys {
  HYTALK_SYNC_TIMESTAMP = 'HYTALK_SYNC_TIMESTAMP',
  access_token = 'access_token',
  lang = 'language',
  theme = 'theme',
}

const set = (key: LocalStorageKeys, value: string): void => {
  window.localStorage.setItem(key, value);
};

const get = (key: LocalStorageKeys): string | null =>
  window.localStorage.getItem(key);

const remove = (key: LocalStorageKeys): void => {
  window.localStorage.removeItem(key);
};

export const typedLocalStorage = {
  set,
  get,
  remove,
};

export default Utils;
export { default as calcAge } from './calc-age';
export { default as calcDuration } from './calc-duration';
export { default as getLastOffence } from './get-last-offence';
export * from './get-offender-property-values';
export { default as isAuthorised } from './is-authorised';
export { default as formatDate } from './formatDate';
export { default as getMentionContent } from './formatDate';
