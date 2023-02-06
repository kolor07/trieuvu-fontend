export const backEndPoint = {
    singIn: '/v1/auth/signin',
    signUp: '/v1/auth/signup',
    refreshToken: '/v1/auth/refreshtoken',
    newArrival: '/v1/product/newarrival/',
    newArrivalAuth: '/v1/auth/product/newarrival/',
    bestSale: '/v1/product/bestsale/',
    bestSaleAuth: '/v1/auth/product/bestsale/',
    bestVote: '/v1/product/bestvote/',
    bestVoteAuth: '/v1/auth/product/bestvote/',
    productByCategoryId: '/v1/product/categoryId/',
    productAuthByCategoryId: '/v1/auth/product/categoryId/',
    categoryById: '/v1/category/',
    categoryAuthById: '/v1/auth/category/',
    productDetail: '/v1/product-detail/',
    productDetailAuth: '/v1/auth/product-detail/',
    checkOut: '/v1/check-out/',
    order: '/v1/order/',
    search: '/v1/search/',
    getCategoryForMenu: 'v1/category/menu',
    coupon: '/v1/coupon/',
};

export const phoneRegExp = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;

export const tabType = {
    newArrival: 'newArrival',
    bestSale: 'bestSale',
    bestVote: 'bestVote',
};

export const routeExtra = {
    productDetail: '/product-detail/',
};

export const provinceApiUrl = {
    baseUrl: 'https://provinces.open-api.vn/api',
    province: '/p/',
    district: '/d/',
    wards: 'w/',
};

export const createStore = (key) => {
    const store = JSON.parse(localStorage.getItem(key)) ?? {};
    const save = () => localStorage.setItem(key, JSON.stringify(store));
    const removeItem = () => localStorage.removeItem(key);

    const storage = {
        get(key) {
            return store[key];
        },
        set(key, value) {
            store[key] = value;
            save();
        },
        delete() {
            removeItem();
        },
    };
    return storage;
};

export const formatMoney = (money) => {
    const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 2 };
    return new Intl.NumberFormat('vi-VN', config).format(money);
};

export const localStorageAccess = () => {
    console.log('localStorageAccess...');

    const storage = {
        getItems(key) {
            return JSON.parse(localStorage.getItem(key));
        },
        setItems(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        removeItems(key) {
            localStorage.removeItem(key);
        },
    };
    return storage;
};
