"use client";
import React from "react";
import styles from "@/app/(admin)/components/Sidebar/Sidebar.module.css";
import { usePathname } from "next/navigation";
import {
  DashboardIcon,
  ProductIcon,
  SidebarCategoryIcon,
  OrderIcon,
  CustomerIcon,
  CouponIcon,
  SettingIcon,
  LogoutIcon,
} from "@/app/(admin)/components/AllSvgIcon";
import Link from "next/link";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  console.log(pathname);

  const sidebarMenus = [
    {
      name: "Dashboard",
      exact: true,
      icon: <DashboardIcon />,
      link: "/admin/dashboard",
    },
    {
      name: "Products",
      exact: false,
      icon: <ProductIcon />,
      link: "/admin/products",
    },
    {
      name: "Category",
      exact: false,
      icon: <SidebarCategoryIcon />,
      link: "/admin/category",
    },
    {
      name: "Orders",
      exact: false,
      icon: <OrderIcon />,
      link: "/admin/orders",
    },
    {
      name: "Customers",
      exact: false,
      icon: <CustomerIcon />,
      link: "/admin/customers",
    },
    {
      name: "Reviews",
      exact: false,
      icon: <CouponIcon />,
      link: "/admin/reviews",
    },
  ];

  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.side}>
          {sidebarMenus.map((item) => (
            <Link className={styles.link} href={item.link}>
              <div className={styles.menu}>
              <div className={`${styles.navItem} ${pathname === item.link ? styles.active : ''}`}>
                  <span className={styles.icon}>{item.icon}</span>
                  <span className={styles.icon}> {item.name}</span>
                </div> 
              </div>
            </Link>   
          ))} 
        </div>
      </div>  
           <div className={styles.logo}>
  <div className={styles.icon2}>
    <LogoutIcon/>
  </div> 
  <div className= {styles.logout} >Logout</div>
</div>
   
   
   
   
   
    </>
  );
};

export default Sidebar;

