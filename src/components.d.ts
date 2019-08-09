/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface CwsButton {
    'autofocus': boolean;
    'disabled': boolean;
    'href'?: string;
    'size': 'lg' | 'md' | 'sm';
    'type': 'button' | 'submit' | 'reset';
    'variant': 'primary' | 'secondary';
  }
  interface MyComponent {
    /**
    * The first name
    */
    'first': string;
    /**
    * The last name
    */
    'last': string;
    /**
    * The middle name
    */
    'middle': string;
  }
}

declare global {


  interface HTMLCwsButtonElement extends Components.CwsButton, HTMLStencilElement {}
  var HTMLCwsButtonElement: {
    prototype: HTMLCwsButtonElement;
    new (): HTMLCwsButtonElement;
  };

  interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {}
  var HTMLMyComponentElement: {
    prototype: HTMLMyComponentElement;
    new (): HTMLMyComponentElement;
  };
  interface HTMLElementTagNameMap {
    'cws-button': HTMLCwsButtonElement;
    'my-component': HTMLMyComponentElement;
  }
}

declare namespace LocalJSX {
  interface CwsButton extends JSXBase.HTMLAttributes<HTMLCwsButtonElement> {
    'autofocus'?: boolean;
    'disabled'?: boolean;
    'href'?: string;
    'size'?: 'lg' | 'md' | 'sm';
    'type'?: 'button' | 'submit' | 'reset';
    'variant'?: 'primary' | 'secondary';
  }
  interface MyComponent extends JSXBase.HTMLAttributes<HTMLMyComponentElement> {
    /**
    * The first name
    */
    'first'?: string;
    /**
    * The last name
    */
    'last'?: string;
    /**
    * The middle name
    */
    'middle'?: string;
  }

  interface IntrinsicElements {
    'cws-button': CwsButton;
    'my-component': MyComponent;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


