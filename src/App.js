import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import DefaultLayout from './layout/DefaultLayout';
import { publicRoutes } from './route/routes';

import { AppProvider } from './context/appContext';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {publicRoutes.map((item, index) => {
                        const Page = item.component;
                        let Layout = DefaultLayout;

                        if (item.layout) {
                            Layout = item.layout;
                        } else if (item.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={item.path}
                                element={
                                    <AppProvider>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </AppProvider>
                                }
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
