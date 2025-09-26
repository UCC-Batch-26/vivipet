import { Routes, Route, NavLink } from 'react-router-dom';

import { Home } from '@/modules/home/pages/home';
import { Pet } from '@/modules/pet/pages/pet';
import { About } from '@/modules/about/pages/about';
import { SignUp } from '@/modules/home/pages/sign-up';
import styles from './index.module.css';
import { IMAGES } from '@/assets/images';

export default function App() {
  return (
    <div className={styles.appContainer}>
      <header className={styles.navbar}>
        <img src={IMAGES.gpLogo} alt="Logo" className={styles.logo} />
        <nav>
          <NavLink to="/" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}>
            Home
          </NavLink>

          <NavLink to="/pet" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}>
            My Pet
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}>
            About
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pet" element={<Pet />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  );
}

// import { HomePage } from '@/modules/home/pages/home-page';
// import { SampleLayout } from '@/modules/sample/layouts/sample-layout';
// import { SampleAddPage } from '@/modules/sample/pages/sample-add-page';
// import { SampleIndexPage } from '@/modules/sample/pages/sample-index-page';
// import { SampleViewPage } from '@/modules/sample/pages/sample-view-page';
// import { createBrowserRouter, RouterProvider } from 'react-router';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <HomePage />,
//     index: true,
//   },
//   {
//     path: '/sample',
//     element: <SampleLayout />,
//     children: [
//       {
//         path: '',
//         index: true,
//         element: <SampleIndexPage />,
//       },
//       {
//         path: ':id',
//         element: <SampleViewPage />,
//       },
//       {
//         path: 'add',
//         element: <SampleAddPage />,
//       },
//     ],
//   },
// ]);

// export function App() {
//   return <RouterProvider router={router} />;
// }
