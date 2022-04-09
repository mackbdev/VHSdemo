import { render, screen } from '@testing-library/react';
import ToggleButton from './index';

describe('ToggleButton Component',()=>{
    it('rendered',()=>{
        const {getByTestId} = render(<ToggleButton/>)
        const toggleButton = getByTestId('toggle-button')
        expect(toggleButton).toBeTruthy()
    })
})
