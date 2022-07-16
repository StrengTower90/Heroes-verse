import { fireEvent, render, screen } from "@testing-library/react"
import { AuthContext } from "../../../src/auth"
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Navbar } from "../../../src/ui";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('pruebas en el <Navbar />', () => { 

    const contextValue = {
        logged: true,
        user: {
            name: 'Daniel',
            id: '123',
        }
    }

    const logoutMock = jest.fn();

    
    test('debe de mostrar el usuario', () => {       

        render(
            <AuthContext.Provider value={ contextValue } >
                <MemoryRouter initialEntries={['/login']}>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )
       
        expect( screen.getByText('Daniel')).toBeTruthy();
        
     })

     test('debe de llamar el logout, y navigate cuando hac click en el boton', () => { 
         
        render(
            <AuthContext.Provider value={ { contextValue,  logout: logoutMock }} >
                <MemoryRouter initialEntries={['/login']}>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        ) 

        const onLogoutButton = screen.getByRole('button');
        fireEvent.click( onLogoutButton );

        expect( logoutMock ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true});
      })
 })