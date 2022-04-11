import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {

    it('Rendered', () => {
        const { getByTestId } = render(<App />)
        const app = getByTestId('app')
        expect(app).toBeTruthy()
    })

    it('Expect App to be rendered containing Latest 10 Blocks text', () => {
        render(<App />)
        const containingText = screen.getByText('Latest 10 Blocks');
        expect(containingText).toBeInTheDocument();
    })

})
