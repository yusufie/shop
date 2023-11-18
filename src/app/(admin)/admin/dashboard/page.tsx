// "use client";
import Layout from '@/app/(admin)/components/Layout/Layout'
import DasboardComponent   from '@/app/(admin)/components/Dashboard/Dashboard'

function DashboardPage () {
/* 
    // Check if user and access token exist in local storage
    const user = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
  
    if (!user || !accessToken) {
      // Redirect to the home page
      window.location.href = '/';
      return null; // null to prevent rendering the rest of the component
    }
    
  console.log('hey user:', localStorage.getItem('user'));
  console.log('hey accessToken:', localStorage.getItem('accessToken'));
 */
  return (
    <Layout>
     <DasboardComponent />
    </Layout>
  )
}

export default DashboardPage