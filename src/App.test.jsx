import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component',()=>{
    it('rendered',()=>{
        const {getByTestId} = render(<App/>)
        const app = getByTestId('app')
        expect(app).toBeTruthy()
    })
})
