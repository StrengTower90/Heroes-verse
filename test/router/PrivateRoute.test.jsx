import  { render, screen }  from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoutes } from '../../src/router/PrivateRoutes';
 
describe('pruebas enel <PrivateRoute>', () => { 
    
   test('debe de mostrar el children si esta auntenticado', () => { 

    Storage.prototype.setItem = jest.fn();
       
    const contexValue = {
        logged:true,
        user: {
            name: 'straider',
            id: 'ABC123'
        }
    }
    
     render(
        <AuthContext.Provider value={ contexValue }>
            <MemoryRouter initialEntries={ ['/search?q=batman']}>
                <PrivateRoutes>
                <h1>
                   Ruta publica
                </h1>
            </PrivateRoutes>
            </MemoryRouter>
        </AuthContext.Provider> 
     )
     expect( screen.getByText('Ruta publica')).toBeTruthy();
     expect( localStorage.setItem).toHaveBeenCalledWith("lastPath", "/search?q=batman");

    })
 })