export const sales_nav_links = [
  {
    id: 1,
    text: "Sales Performance",
    path: "/sales_performance",
  },
  {
    id: 2,
    text: "Commission Payout",
    path: "/sales_commission",
  },
];

export const admin_nav_links = [
  {
    id: 1,
    text: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    text: "User Management",
    children: [
      {
        id: 3,
        text: "User Management",
        path: "/admin/user_management",
      },
      {
        id: 4,
        text: "Mapping Management",
        path: "/admin/mapping_management",
      },
    ],
  },
  {
    id: 5,
    text: "Sales Management",
    children: [
      {
        id: 6,
        text: "Sales Performance",
        path: "/admin/sales_performance",
      },
      {
        id: 7,
        text: "Sales Payout",
        path: "/admin/sales_payout",
      },
    ],
  },
  {
    id: 8,
    text: "Data Management",
    path: "/admin/data_management",
  },
];
