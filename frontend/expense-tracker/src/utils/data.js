import { LuHandCoins, LuLayoutDashboard, LuWalletMinimal, LuLogOut } from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard",
        description: "Overview of your finances"
    },
    {
        id: "02", 
        label: "Income",
        icon: LuWalletMinimal,
        path: "/income",
        description: "Track your earnings"
    },
    {
        id: "03",
        label: "Expense", 
        icon: LuHandCoins,
        path: "/expense",
        description: "Monitor your spending"
    },
    {
        id: "04",
        label: "Logout",
        icon: LuLogOut,
        path: "logout",
        description: "Sign out of your account"
    }
]