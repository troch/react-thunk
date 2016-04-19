import React from 'react';

const getDisplayName = (component) => component.displayName || component.name || 'Component';

const shallowEquals = (left, right) =>
    Object.keys(left).length === Object.keys(right).length &&
    Object.keys(left).every((leftKey) => left[leftKey] === right[leftKey]);

const thunk = (component, pure) => {
    class ReactThunk extends React.Component {
        constructor(props) {
            super(props);
            this.componentFn = component(props);

            if (typeof this.componentFn !== 'function') {
                throw new Error(`[react-thunk] component supplied doesn't return a function`);
            }
        }

        shouldComponentUpdate(nextProps) {
            if (pure) {
                return !shallowEqual(this.props, nextProps);
            }

            return true;
        }

        render() {
            return this.componentFn(this.props);
        }
   }

   ReactThunk.displayName = `ReactThunk[${getDisplayName(component)}]`;

   return ReactThunk;
};

export default thunk;
