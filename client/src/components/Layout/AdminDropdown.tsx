import { NativeSelect } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { adminRoutes } from "src/router";

export const AdminDropdown = () => {
  const navigate = useNavigate();

  const adminRoutePaths = adminRoutes.map((route) => route.name);
  const adminRouteHashmap: { [key: string]: string } = {};

  adminRoutes.forEach((route) => {
    adminRouteHashmap[route.name] = route.path;
  });

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.currentTarget.value);
    navigate(adminRouteHashmap[event.currentTarget.value]);
  };

  return (
    <NativeSelect
      value="Admin"
      onChange={onChange}
      data={["Admin", ...adminRoutePaths]}
    />
  );
};
