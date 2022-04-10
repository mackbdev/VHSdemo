import { render, screen } from '@testing-library/react';
import ToggleButton from './index';

describe('ToggleButton Component', () => {

    it('Expect toggle button to be rendered', () => {
        const { getByTestId } = render(
            <ToggleButton
                props={{ state: true, toggleFunction: String, title: 'Render' }
            }
            />)
        const toggleButton = getByTestId('toggle-button')
        expect(toggleButton).toBeTruthy()
    })

    it('Expect toggle button with true state to have title input + ON', () => {
        let dataTrueState = { state: true, toggleFunction: String, title: 'TestOne' };
        render(
            <ToggleButton
                props={
                    { data: dataTrueState }
                }
            />)
        const toggleButtonTitle = screen.getByText(`${dataTrueState.title} ON`);
        expect(toggleButtonTitle).toBeInTheDocument();
    })

    it('Expect toggle button with false state to have title input + OFF', () => {
        let dataFalseState = { state: false, toggleFunction: String, title: 'TestTwo' };
        render(
            <ToggleButton
                props={
                    { data: dataFalseState }
                }
            />)
        const toggleButtonTitle = screen.getByText(`${dataFalseState.title} OFF`);
        expect(toggleButtonTitle).toBeInTheDocument();
    })

})
