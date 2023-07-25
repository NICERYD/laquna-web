export const navigations = [
  {
    id: 1,
    name: "공통관리",
    description: "",
    type: "dropDown",
    icon: "dashboard_outlined",
    sub: [
      {
        icon: "i-Clock-3",
        name: "공통 코드 관리",
        link: "/dashboards/learning-management",
        type: "link",
      },
    ],
  },
  {
    id: 2,
    name: "인사관리",
    description: "",
    type: "dropDown",
    icon: "shopping_cart_outlined",
    sub: [
      {
        icon: "i-Clock-3",
        name: "ADT 근태 관리",
        link: "/ecommerce/shop",
        type: "link",
      },
      {
        icon: "i-Over-Time",
        name: "급여 계산",
        link: "/ecommerce/product-details",
        type: "link",
      },
    ],
  },
  {
    id: 3,
    name: "Pricing",
    icon: "format_bullets",
    link: "/pricing",
  },
];
