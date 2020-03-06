/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
// npm install jss jss-plugin-rule-value-function jss-plugin-global jss-plugin-nested jss-plugin-camel-case jss-plugin-default-unit jss-plugin-vendor-prefixer jss-plugin-props-sort
import React from 'react';
import PropTypes from 'prop-types';
import { create } from 'jss';
import functions from 'jss-plugin-rule-value-function';
import global from 'jss-plugin-global';
import nested from 'jss-plugin-nested';
import camelCase from 'jss-plugin-camel-case';
import defaultUnit from 'jss-plugin-default-unit';
import vendorPrefixer from 'jss-plugin-vendor-prefixer';
import propsSort from 'jss-plugin-props-sort';

// Subset of jss-preset-default with only the plugins the Material-UI components are using.
const jssPreset = () => ({
  plugins: [
    functions(),
    global(),
    nested(),
    camelCase(),
    defaultUnit(),
    // Disable the vendor prefixer server-side, it does nothing.
    // This way, we can get a performance boost.
    // In the documentation, we are using `autoprefixer` to solve this problem.
    typeof window === 'undefined' ? null : vendorPrefixer(),
    propsSort(),
  ],
});

// Default JSS instance.
const jss = create(jssPreset());

// Exported for test purposes
export const sheetsManager = new Map();

const defaultOptions = {
  jss,
  sheetsCache: null,
  sheetsManager,
  sheetsRegistry: null,
};

export const InjectFirstContext = React.createContext(defaultOptions);

if (process.env.NODE_ENV !== 'production') {
  InjectFirstContext.displayName = 'InjectFirstContext';
}

let injectFirstNode;

export default function InjectFirstProvider(props) {
  const { children, injectFirst = false, ...localOptions } = props;

  const outerOptions = React.useContext(InjectFirstContext);
  const context = { ...outerOptions, ...localOptions };

  if (process.env.NODE_ENV !== 'production') {
    if (typeof window === 'undefined' && !context.sheetsManager) {
      console.error(
        'Material-UI: you need to use the ServerStyleSheets API when rendering on the server.',
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    if (context.jss.options.insertionPoint && injectFirst) {
      console.error(
        'Material-UI: you cannot use a custom insertionPoint and <InjectFirstContext injectFirst> at the same time.',
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    if (injectFirst && localOptions.jss) {
      console.error('Material-UI: you cannot use the jss and injectFirst props at the same time.');
    }
  }

  if (!context.jss.options.insertionPoint && injectFirst && typeof window !== 'undefined') {
    if (!injectFirstNode) {
      const { head } = document;
      injectFirstNode = document.createComment('mui-inject-first');
      head.insertBefore(injectFirstNode, head.firstChild);
    }

    context.jss = create({ plugins: jssPreset().plugins, insertionPoint: injectFirstNode });
  }

  return (
    <InjectFirstContext.Provider value={context}>
      {children}
    </InjectFirstContext.Provider>
  );
}

InjectFirstProvider.propTypes = {
  // Component tree.
  children: PropTypes.node.isRequired,
  // By default, the styles are injected last in the <head> element of the page.
  // As a result, they gain more specificity than any other style sheet.
  // If you want to override Material-UI's styles, set this prop.
  injectFirst: PropTypes.bool,
  // JSS's instance.
  jss: PropTypes.object,
  sheetsCache: PropTypes.object,
  /**
   * @ignore
   *
   * The sheetsManager is used to deduplicate style sheet injection in the page.
   * It's deduplicating using the (theme, styles) couple.
   * On the server, you should provide a new instance for each request.
   */
  sheetsManager: PropTypes.object,
  /**
   * @ignore
   *
   * Collect the sheets.
   */
  sheetsRegistry: PropTypes.object,
};
