import {
  IconTag,
  IconPackage,
  IconHome,
  IconUsers,
  IconShoppingBag,
} from "@tabler/icons-react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/home",
      icon: IconHome,
      accessedBy: ["Owner", "Store manager", "Product manager"],
    },
    {
      title: "Products",
      url: "/admin/products",
      icon: IconShoppingBag,
      accessedBy: ["Owner", "Store manager", "Product manager"],
    },
    {
      title: "Collections",
      url: "/admin/collections",
      icon: IconTag,
      accessedBy: ["Owner", "Store manager", "Product manager"],
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: IconPackage,
      accessedBy: ["Owner", "Store manager"],
    },
    {
      title: "Members",
      url: "/admin/members",
      icon: IconUsers,
      accessedBy: ["Owner", "Store manager"],
    }
  ],
};

export default data;
