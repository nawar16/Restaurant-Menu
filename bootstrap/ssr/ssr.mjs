import { mapGetters, mapActions } from "vuex";
import axios$1 from "axios";
import { useSSRContext, mergeProps, resolveComponent, withCtx, createTextVNode, createSSRApp, h } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import { createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$4 = {
  name: "category",
  data() {
    return {
      validationErrors: {},
      processing: false,
      category: {
        "name": "",
        "parent_id": "",
        "child_type": "category",
        "discount": 0
      },
      types: [
        { name: "Item", code: "item" },
        { name: "Category", code: "category" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      menu: "menu/currentMenu",
      availableParentCategories: "category/availableParentCategories"
    })
  },
  methods: {
    ...mapActions({
      addCategory: "category/addCategory"
    }),
    async add() {
      this.processing = true;
      axios$1.post(`/api/categories`, this.category).then((res) => {
        this.addCategory(res.data.data);
        this.validationErrors = {};
      }).catch(({ response }) => {
        if (response.status === 422) {
          this.validationErrors = response.data.errors;
        } else {
          this.validationErrors = {};
          alert(response.data.message);
        }
      }).finally(() => {
        this.processing = false;
      });
    }
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="card-header"><div class="col-12 col-md-6 offset-md-3"><div class="card shadow sm"><div class="card-body"><h1 class="text-center">Add Category</h1><hr><form action="javascript:void(0)" class="row" method="post">`);
  if (Object.keys($data.validationErrors).length > 0) {
    _push(`<div class="col-12"><div class="alert alert-danger"><ul class="mb-0"><!--[-->`);
    ssrRenderList($data.validationErrors, (value, key) => {
      _push(`<li>${ssrInterpolate(value)}</li>`);
    });
    _push(`<!--]--></ul></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="form-group col-12"><label for="name" class="font-weight-bold">Category Name</label><input type="text"${ssrRenderAttr("value", $data.category.name)} name="name" id="name" class="form-control"></div><div class="form-group col-12 my-2"><label for="discount" class="font-weight-bold">Category Discount (%)</label><input type="number"${ssrRenderAttr("value", $data.category.discount)} name="discount" id="discount" class="form-control"></div><div class="form-group col-12 my-2"><label for="category" class="font-weight-bold">Parent Category</label><select class="form-select" aria-label="Default select example" id="category"><!--[-->`);
  ssrRenderList(_ctx.availableParentCategories, (cat) => {
    _push(`<option${ssrRenderAttr("value", cat.id)}>${ssrInterpolate(cat.name)}</option>`);
  });
  _push(`<!--]--></select></div><div class="form-group col-12 my-2"><label for="types" class="font-weight-bold">Category Child Type</label><select class="form-select" aria-label="Default select example" id="types"><!--[-->`);
  ssrRenderList($data.types, (type) => {
    _push(`<option${ssrRenderAttr("value", type.code)}>${ssrInterpolate(type.name)}</option>`);
  });
  _push(`<!--]--></select></div><div class="col-12 mb-2"><button type="submit"${ssrIncludeBooleanAttr($data.processing) ? " disabled" : ""} class="btn btn-primary btn-block">${ssrInterpolate($data.processing ? "Please wait" : "Add")}</button></div></form></div></div></div></div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Category.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Category = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4]]);
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Category
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  name: "menu",
  data() {
    return {
      validationErrors: {},
      processing: false
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      menu: "dashboard/currentMenu",
      categories: "category/categories"
    })
  },
  methods: {
    ...mapActions({
      getMenu: "dashboard/getMenu",
      updateMenu: "dashboard/updateMenu",
      removeCategory: "category/removeCategory",
      removeItem: "category/removeItem",
      getCategory: "category/getCategory"
    }),
    calculate() {
      this.processing = true;
      this.getMenu().then((res) => {
      }).finally(() => {
        this.processing = false;
      });
    },
    async update() {
      this.processing = true;
      axios$1.put(`/api/menu/${this.menu.id}`, this.menu).then((res) => {
        res = res.data;
        this.updateMenu(res.data);
        this.getCategory();
        this.validationErrors = {};
      }).catch(({ response }) => {
        if (response.status === 422) {
          this.validationErrors = response.data.errors;
        } else {
          this.validationErrors = {};
          alert(response.data.message);
        }
      }).finally(() => {
        this.processing = false;
      });
    },
    async deleteCategory(id) {
      this.processing = true;
      axios$1.delete(`/api/categories/${id}`).then((res) => {
        this.removeCategory(id);
      }).catch(({ response }) => {
        if (response.status === 422) {
          this.validationErrors = response.data.errors;
        } else {
          this.validationErrors = {};
          alert(response.data.message);
        }
      }).finally(() => {
        this.processing = false;
      });
    },
    async deleteItem(id) {
      this.processing = true;
      axios$1.delete(`/api/items/${id}`).then((res) => {
        this.removeItem();
      }).catch(({ response }) => {
        if (response.status === 422) {
          this.validationErrors = response.data.errors;
        } else {
          this.validationErrors = {};
          alert(response.data.message);
        }
      }).finally(() => {
        this.processing = false;
      });
    }
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><div class="row justify-content-center"><div class="col-6 col-md-6"><div class="card shadow sm"><div class="card-body"><form action="javascript:void(0)" class="row" method="post">`);
  if (Object.keys($data.validationErrors).length > 0) {
    _push(`<div class="col-12"><div class="alert alert-danger"><ul class="mb-0"><!--[-->`);
    ssrRenderList($data.validationErrors, (value, key) => {
      _push(`<li>${ssrInterpolate(value)}</li>`);
    });
    _push(`<!--]--></ul></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="form-group col-12"><label for="name" class="font-weight-bold">Menu Name</label><input type="text"${ssrRenderAttr("value", _ctx.menu.name)} name="name" id="name" class="form-control"></div><div class="form-group col-12 my-2"><label for="discount" class="font-weight-bold">Discount on Menu (%)</label><input type="number"${ssrRenderAttr("value", _ctx.menu.discount)} name="discount" id="discount" class="form-control"></div><div class="form-group col-12 my-2"><label for="price1" class="font-weight-bold">Price of Menu After Discount</label><input type="number" disabled${ssrRenderAttr("value", _ctx.menu.prices.discountPrice)} name="price1" id="price1" class="form-control"></div><div class="form-group col-12 my-2"><label for="price2" class="font-weight-bold">Original Price of Menu</label><input type="number" disabled${ssrRenderAttr("value", _ctx.menu.prices.originalPrice)} name="price2" id="price2" class="form-control d-inline"></div><div class="form-group col-12 my-2"><label for="price3" class="font-weight-bold">Total Price</label><input type="number" disabled${ssrRenderAttr("value", _ctx.menu.prices.totalPrice)} name="price3" id="price3" class="form-control d-inline"></div><div class="col-12 mb-2"><button type="submit"${ssrIncludeBooleanAttr($data.processing) ? " disabled" : ""} class="btn btn-primary btn-block">${ssrInterpolate($data.processing ? "Please wait" : "update")}</button><button${ssrIncludeBooleanAttr($data.processing) ? " disabled" : ""} class="btn btn-success float-end">${ssrInterpolate($data.processing ? "Please wait" : "refresh total menu prices")}</button></div></form></div></div></div><div class="col-6 col-md-6"><div class="card"><div class="card-header justify-content-center">Categories and Items Tree</div><div class="card-body"><!--[-->`);
  ssrRenderList(_ctx.categories, (item) => {
    _push(`<ul><div class="card-header">Category Name : ${ssrInterpolate(item.name)} / Discount: (${ssrInterpolate(item.discount)}%) <button class="btn btn-danger"> X </button></div><hr class="hr"><!--[-->`);
    ssrRenderList(item.sub_categories, (subItem) => {
      _push(`<ul><div class="card-header">Sub Category (level-1) Name : ${ssrInterpolate(subItem.name)} / Discount: (${ssrInterpolate(subItem.discount)}%) <button class="btn btn-danger"> X </button></div><hr class="hr"><!--[-->`);
      ssrRenderList(subItem.sub_categories, (subItem2) => {
        _push(`<ul><div class="card-header">Sub Category (level-2) Name : ${ssrInterpolate(subItem2.name)} / Discount: (${ssrInterpolate(subItem2.discount)}%) <button class="btn btn-danger"> X </button></div><hr class="hr"><!--[-->`);
        ssrRenderList(subItem2.sub_categories, (subItem3) => {
          _push(`<ul><div class="card-header">Sub Category (level-3) Name : ${ssrInterpolate(subItem3.name)} / Discount: (${ssrInterpolate(subItem3.discount)}%) <button class="btn btn-danger"> X </button></div><hr class="hr"><!--[-->`);
          ssrRenderList(subItem3.sub_categories, (subItem4) => {
            _push(`<ul><div class="card-header">Sub Category (level-4) Name : ${ssrInterpolate(subItem4.name)} / Discount: (${ssrInterpolate(subItem4.discount)}%) <button class="btn btn-danger"> X </button></div><hr class="hr"><!--[-->`);
            ssrRenderList(subItem4.items, (item2) => {
              _push(`<ul><li>Item Name:${ssrInterpolate(item2.name)} / Price:${ssrInterpolate(item2.price)} / Discount: (${ssrInterpolate(item2.discount)}%) / Discounted Price: ${ssrInterpolate(item2.discount_price)} <button class="btn btn-danger"> X </button></li></ul>`);
            });
            _push(`<!--]--></ul>`);
          });
          _push(`<!--]--><!--[-->`);
          ssrRenderList(subItem3.items, (item2) => {
            _push(`<ul><li>Item Name:${ssrInterpolate(item2.name)} / Price:${ssrInterpolate(item2.price)} / Discount: (${ssrInterpolate(item2.discount)}%) / Discounted Price: ${ssrInterpolate(item2.discount_price)} <button class="btn btn-danger"> X </button></li></ul>`);
          });
          _push(`<!--]--></ul>`);
        });
        _push(`<!--]--><!--[-->`);
        ssrRenderList(subItem2.items, (item2) => {
          _push(`<ul><li>Item Name:${ssrInterpolate(item2.name)} / Price:${ssrInterpolate(item2.price)} / Discount: (${ssrInterpolate(item2.discount)}%) / Discounted Price: ${ssrInterpolate(item2.discount_price)} <button class="btn btn-danger"> X </button></li></ul>`);
        });
        _push(`<!--]--></ul>`);
      });
      _push(`<!--]--><!--[-->`);
      ssrRenderList(subItem.items, (item2) => {
        _push(`<ul><li>Item Name:${ssrInterpolate(item2.name)} / Price:${ssrInterpolate(item2.price)} / Discount: (${ssrInterpolate(item2.discount)}%) / Discounted Price: ${ssrInterpolate(item2.discount_price)} <button class="btn btn-danger"> X </button></li></ul>`);
      });
      _push(`<!--]--></ul>`);
    });
    _push(`<!--]--><!--[-->`);
    ssrRenderList(item.items, (item2) => {
      _push(`<ul><li>Item Name:${ssrInterpolate(item2.name)} / Price:${ssrInterpolate(item2.price)} / Discount: (${ssrInterpolate(item2.discount)}%) / Discounted Price: ${ssrInterpolate(item2.discount_price)} <button class="btn btn-danger"> X </button></li></ul>`);
    });
    _push(`<!--]--></ul>`);
  });
  _push(`<!--]--></div></div></div></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
  name: "item",
  data() {
    return {
      validationErrors: {},
      processing: false,
      item: {
        "name": "",
        "category_id": "",
        "price": 0,
        "discount": 0
      }
    };
  },
  computed: {
    ...mapGetters({
      availableItemCategories: "category/availableItemCategories"
    })
  },
  methods: {
    ...mapActions({
      addItem: "category/addItem"
    }),
    async add() {
      this.processing = true;
      axios$1.post(`/api/items`, this.item).then((res) => {
        this.addItem(res.data);
        this.validationErrors = {};
      }).catch(({ response }) => {
        if (response.status === 422) {
          this.validationErrors = response.data.errors;
        } else {
          this.validationErrors = {};
          alert(response.data.message);
        }
      }).finally(() => {
        this.processing = false;
      });
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="card-header"><div class="col-12 col-md-6 offset-md-3"><div class="card shadow sm"><div class="card-body"><h1 class="text-center">Add Item</h1><hr><form action="javascript:void(0)" class="row" method="post">`);
  if (Object.keys($data.validationErrors).length > 0) {
    _push(`<div class="col-12"><div class="alert alert-danger"><ul class="mb-0"><!--[-->`);
    ssrRenderList($data.validationErrors, (value, key) => {
      _push(`<li>${ssrInterpolate(value)}</li>`);
    });
    _push(`<!--]--></ul></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="form-group col-12"><label for="name" class="font-weight-bold">Item Name</label><input type="text"${ssrRenderAttr("value", $data.item.name)} name="name" id="name" class="form-control"></div><div class="form-group col-12 my-2"><label for="discount" class="font-weight-bold">Item Discount (%)</label><input type="number"${ssrRenderAttr("value", $data.item.discount)} name="discount" id="discount" class="form-control"></div><div class="form-group col-12 my-2"><label for="category" class="font-weight-bold">Item Category</label><select class="form-select" aria-label="Default select example" id="category"><!--[-->`);
  ssrRenderList(_ctx.availableItemCategories, (cat) => {
    _push(`<option${ssrRenderAttr("value", cat.id)}>${ssrInterpolate(cat.name)}</option>`);
  });
  _push(`<!--]--></select></div><div class="form-group col-12 my-2"><label for="price" class="font-weight-bold">Item Price ($)</label><input type="number"${ssrRenderAttr("value", $data.item.price)} name="price" id="price" class="form-control"></div><div class="col-12 mb-2"><button type="submit"${ssrIncludeBooleanAttr($data.processing) ? " disabled" : ""} class="btn btn-primary btn-block">${ssrInterpolate($data.processing ? "Please wait" : "Add")}</button></div></form></div></div></div></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Item.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Item = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Item
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = {
  name: "login",
  data() {
    return {
      auth: {
        email: "",
        password: ""
      },
      validationErrors: {},
      processing: false
    };
  },
  methods: {
    ...mapActions({
      signIn: "auth/login",
      getMenu: "dashboard/getMenu",
      getCategory: "category/getCategory",
      availableParentCategories: "category/availableParentCategories",
      availableItemCategories: "category/availableItemCategories"
    }),
    async login() {
      this.processing = true;
      await axios$1.get("/sanctum/csrf-cookie");
      await axios$1.post("/login", this.auth).then(({ data }) => {
        this.signIn();
        this.getMenu();
        this.getCategory();
        this.availableParentCategories();
        this.availableItemCategories();
      }).catch(({ response }) => {
        if (response.status === 422) {
          this.validationErrors = response.data.errors;
        } else {
          this.validationErrors = {};
          alert(response.data.message);
        }
      }).finally(() => {
        this.processing = false;
      });
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container h-100" }, _attrs))}><div class="row h-100 align-items-center"><div class="col-12 col-md-6 offset-md-3"><div class="card shadow sm"><div class="card-body"><h1 class="text-center">Login</h1><h3 class="text-center">Restaurant Menu</h3><hr><form action="javascript:void(0)" class="row" method="post">`);
  if (Object.keys($data.validationErrors).length > 0) {
    _push(`<div class="col-12"><div class="alert alert-danger"><ul class="mb-0"><!--[-->`);
    ssrRenderList($data.validationErrors, (value, key) => {
      _push(`<li>${ssrInterpolate(value)}</li>`);
    });
    _push(`<!--]--></ul></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="form-group col-12"><label for="email" class="font-weight-bold">Email</label><input type="text"${ssrRenderAttr("value", $data.auth.email)} name="email" id="email" class="form-control"></div><div class="form-group col-12 my-2"><label for="password" class="font-weight-bold">Password</label><input type="password"${ssrRenderAttr("value", $data.auth.password)} name="password" id="password" class="form-control"></div><div class="col-12 mb-2"><button type="submit"${ssrIncludeBooleanAttr($data.processing) ? " disabled" : ""} class="btn btn-primary btn-block">${ssrInterpolate($data.processing ? "Please wait" : "Login")}</button></div><div class="col-12 text-center"><label>Don&#39;t have an account? `);
  _push(ssrRenderComponent(_component_router_link, { to: { name: "register" } }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Register Now!`);
      } else {
        return [
          createTextVNode("Register Now!")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</label></div></form></div></div></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Login.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Login = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {
  name: "register",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      validationErrors: {},
      processing: false
    };
  },
  methods: {
    ...mapActions({
      signIn: "auth/login",
      getMenu: "dashboard/getMenu",
      getCategory: "category/getCategory",
      availableParentCategories: "category/availableParentCategories",
      availableItemCategories: "category/availableItemCategories"
    }),
    async register() {
      this.processing = true;
      await axios.get("/sanctum/csrf-cookie");
      await axios.post("/register", this.user).then((response) => {
        this.validationErrors = {};
        this.signIn();
        this.getMenu();
        this.getCategory();
        this.availableParentCategories();
        this.availableItemCategories();
      }).catch(({ response }) => {
        if (response.status === 422) {
          this.validationErrors = response.data.errors;
        } else {
          this.validationErrors = {};
          alert(response.data.message);
        }
      }).finally(() => {
        this.processing = false;
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container h-100" }, _attrs))}><div class="row h-100 align-items-center"><div class="col-12 col-md-6 offset-md-3"><div class="card shadow sm"><div class="card-body"><h1 class="text-center">Register</h1><h3 class="text-center">Restaurant Menu</h3><hr><form action="javascript:void(0)" class="row" method="post">`);
  if (Object.keys($data.validationErrors).length > 0) {
    _push(`<div class="col-12"><div class="alert alert-danger"><ul class="mb-0"><!--[-->`);
    ssrRenderList($data.validationErrors, (value, key) => {
      _push(`<li>${ssrInterpolate(value)}</li>`);
    });
    _push(`<!--]--></ul></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="form-group col-12"><label for="name" class="font-weight-bold">Name</label><input type="text" name="name"${ssrRenderAttr("value", $data.user.name)} id="name" placeholder="Enter name" class="form-control"></div><div class="form-group col-12 my-2"><label for="email" class="font-weight-bold">Email</label><input type="text" name="email"${ssrRenderAttr("value", $data.user.email)} id="email" placeholder="Enter Email" class="form-control"></div><div class="form-group col-12"><label for="password" class="font-weight-bold">Password</label><input type="password" name="password"${ssrRenderAttr("value", $data.user.password)} id="password" placeholder="Enter Password" class="form-control"></div><div class="form-group col-12 my-2"><label for="password_confirmation" class="font-weight-bold">Confirm Password</label><input type="password" name="password_confirmation"${ssrRenderAttr("value", $data.user.password_confirmation)} id="password_confirmation" placeholder="Confirm Password" class="form-control"></div><div class="col-12 mb-2"><button type="submit"${ssrIncludeBooleanAttr($data.processing) ? " disabled" : ""} class="btn btn-primary btn-block">${ssrInterpolate($data.processing ? "Please wait" : "Register")}</button></div><div class="col-12 text-center"><label>Already have an account? `);
  _push(ssrRenderComponent(_component_router_link, { to: { name: "login" } }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Login Now!`);
      } else {
        return [
          createTextVNode("Login Now!")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</label></div></form></div></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Register = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Category.vue": __vite_glob_0_0, "./Pages/Dashboard.vue": __vite_glob_0_1, "./Pages/Item.vue": __vite_glob_0_2, "./Pages/Login.vue": __vite_glob_0_3, "./Pages/Register.vue": __vite_glob_0_4 });
      return pages[`./Pages/${name}.vue`];
    },
    setup({ App, props, plugin }) {
      return createSSRApp({
        render: () => h(App, props)
      }).use(plugin);
    }
  })
);
