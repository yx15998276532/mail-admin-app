/**
 * 储存的是 角色对应的权限名称
 */

const roleToRoute = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'ProductEdit',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'Manage',
  }, {
    name: 'ProductEdit',
  },
  ],
};
/**
 *
 * @param {string} role
 * @param {Array} routes
 * @returns
 */
export default function getMenuRoute(role, routes) {
  // console.log(role, routes);
  const allowRoutesName = roleToRoute[role].map((item) => item.name);// 给我一个角色role，遍历一下我这里有没有
  const resultRoutes = routes.filter((r) => {
    const obj = r;
    if (allowRoutesName.indexOf(r.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter((e) => allowRoutesName.indexOf(e.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
