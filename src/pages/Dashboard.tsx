import { Card } from "@/components/ui/card";
import { BarChart, DollarSign, Package, ShoppingCart } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Sales",
      value: "$1,234",
      icon: DollarSign,
      change: "+12%",
    },
    {
      title: "Orders",
      value: "12",
      icon: ShoppingCart,
      change: "+8%",
    },
    {
      title: "Products",
      value: "45",
      icon: Package,
      change: "+2%",
    },
    {
      title: "Revenue",
      value: "$12,345",
      icon: BarChart,
      change: "+18%",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="bg-primary/5 p-3 rounded-full">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-success text-sm font-medium">
                  {stat.change}
                </span>
                <span className="text-sm text-muted-foreground ml-1">
                  vs last month
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;