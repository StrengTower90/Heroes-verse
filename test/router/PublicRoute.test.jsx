import { render, screen } from "@testing-library/react"
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from "../../src/auth"
import { PublicRoute } from "../../src/router/PublicRoute"

describe('pruebas en el <PublicRoute/>', () => { 
    
    test('debe de mostrar el children si no esta auntenticado', () => {  

        const contexValue = {
            logged: false
        }
        
        render( 
            <AuthContext.Provider value={ contexValue } >
               <PublicRoute>
                <h1>Ruta publica</h1>
               </PublicRoute>
            </AuthContext.Provider>
        );

        // screen.debug();
        expect( screen.getByText('Ruta publica')).toBeTruthy();
     })

     test('debe de navegar si esta auntenticado', function() { 
         
        const contexValue = {
            logged:true,
            user: {
                name: 'straider',
                id: 'ABC123'
            }
        }

        render(
           <AuthContext.Provider value={ contexValue }>
              <MemoryRouter initialEntries={ ['/login'] }>

                <Routes>
                    <Route path='login' element={
                     <PublicRoute>
                     <h1>Ruta privada</h1>
                    </PublicRoute>   
                    } />
                    
                    <Route path='marvel' element={ <h1>Pagina Marvel</h1> } />
                </Routes>   
                            
              </MemoryRouter>   
           </AuthContext.Provider>
        );

       expect( screen.getByText('Pagina Marvel')).toBeTruthy();
      })
 })