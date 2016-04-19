# react-thunk

> Define React functional stateless components as thunks

## Install

```sh
npm i --save react-thunk
```

## Why?

__Instead of doing the following, and setting a new change listener on each render:__

```js
function NameField(props) {
    const { name, setName } = props;

    return <input type="text" value={ name } onChange={ (evt) => setName(evt.target.value) } />;
}
```

__Do the following, and only define your change listener once:__

```js
function NameField(initialProps) {
    const { setName } = initialProps;
    const changeHandler = (evt) => setName(evt.target.value);

    return (props) => {
        const { name } = props;

        return <input type="text" value={ name } onChange={ changeHandler } />;
    };
}
```

## How?

It creates a class for you.
