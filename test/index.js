import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import thunk from '../modules';

chai.use(sinonChai);

describe('ReactThunk', () => {
    function NameField(initialProps) {
        const { setName } = initialProps;
        const changeHandler = (evt) => setName(evt.target.value);

        return (props) => {
            const { name } = props;

            return <input type="text" value={ name } onChange={ changeHandler } />;
        };
    }

    it('should render a thunk', () => {
        const NameFieldThunk = thunk(NameField);
        const setName = sinon.spy();
        const output = shallow(<NameFieldThunk name='Thomas' setName={ setName } />);

        output.find('input').simulate('change', { target: { value: 'T' }});

        expect(setName).to.have.been.calledWith('T');
    });
})
