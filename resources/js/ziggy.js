const Ziggy = {
    url: "http://localhost",
    port: null,
    defaults: {},
    routes: {
        "sanctum.csrf-cookie": {
            uri: "sanctum/csrf-cookie",
            methods: ["GET", "HEAD"],
        },
        "admin.dashboard": { uri: "admin", methods: ["GET", "HEAD"] },
        "admin.tutorial.index": {
            uri: "admin/manajemen-tutorial",
            methods: ["GET", "HEAD"],
        },
        "admin.tutorial.store": {
            uri: "admin/manajemen-tutorial",
            methods: ["POST"],
        },
        "admin.tutorial.update": {
            uri: "admin/manajemen-tutorial/{tutorial}",
            methods: ["PUT"],
            parameters: ["tutorial"],
            bindings: { tutorial: "id" },
        },
        "admin.tutorial.delete": {
            uri: "admin/manajemen-tutorial/{tutorial}",
            methods: ["DELETE"],
            parameters: ["tutorial"],
            bindings: { tutorial: "id" },
        },
        "admin.user.index": {
            uri: "admin/manajemen-user",
            methods: ["GET", "HEAD"],
        },
        "admin.user.show": {
            uri: "admin/manajemen-user/detail/{user}",
            methods: ["GET", "HEAD"],
            parameters: ["user"],
            bindings: { user: "id" },
        },
        "admin.user.create": {
            uri: "admin/manajemen-user/tambah",
            methods: ["GET", "HEAD"],
        },
        "admin.user.store": { uri: "admin/manajemen-user", methods: ["POST"] },
        "admin.user.edit": {
            uri: "admin/manajemen-user/edit/{user}",
            methods: ["GET", "HEAD"],
            parameters: ["user"],
            bindings: { user: "id" },
        },
        "admin.user.update": {
            uri: "admin/manajemen-user/{user}",
            methods: ["PUT"],
            parameters: ["user"],
            bindings: { user: "id" },
        },
        "admin.user.destroy": {
            uri: "admin/manajemen-user/{user}",
            methods: ["DELETE"],
            parameters: ["user"],
        },
        "admin.booking.index": {
            uri: "admin/manajemen-booking",
            methods: ["GET", "HEAD"],
        },
        "admin.booking.show": {
            uri: "admin/manajemen-booking/detail/{booking}",
            methods: ["GET", "HEAD"],
            parameters: ["booking"],
            bindings: { booking: "id" },
        },
        "admin.booking.create": {
            uri: "admin/manajemen-booking/tambah",
            methods: ["GET", "HEAD"],
        },
        "admin.booking.createInvoice": {
            uri: "admin/manajemen-booking/tambah-invoice",
            methods: ["GET", "HEAD"],
        },
        "admin.booking.store": {
            uri: "admin/manajemen-booking",
            methods: ["POST"],
        },
        "admin.booking.edit": {
            uri: "admin/manajemen-booking/edit/{booking}",
            methods: ["GET", "HEAD"],
            parameters: ["booking"],
            bindings: { booking: "id" },
        },
        "admin.booking.update": {
            uri: "admin/manajemen-booking/{booking}",
            methods: ["PUT"],
            parameters: ["booking"],
            bindings: { booking: "id" },
        },
        "admin.booking.delete": {
            uri: "admin/manajemen-booking/{booking}",
            methods: ["DELETE"],
            parameters: ["booking"],
            bindings: { booking: "id" },
        },
        "admin.katalog.index": {
            uri: "admin/manajemen-katalog",
            methods: ["GET", "HEAD"],
        },
        "admin.katalog.store": {
            uri: "admin/manajemen-katalog",
            methods: ["POST"],
        },
        "admin.katalog.update": {
            uri: "admin/manajemen-katalog/{katalog}",
            methods: ["PUT"],
            parameters: ["katalog"],
            bindings: { katalog: "id" },
        },
        "admin.katalog.delete": {
            uri: "admin/manajemen-katalog/{katalog}",
            methods: ["DELETE"],
            parameters: ["katalog"],
            bindings: { katalog: "id" },
        },
        "admin.ulasan.index": {
            uri: "admin/manajemen-ulasan",
            methods: ["GET", "HEAD"],
        },
        "admin.produk.index": {
            uri: "admin/manajemen-produk",
            methods: ["GET", "HEAD"],
        },
        "admin.produk.store": {
            uri: "admin/manajemen-produk",
            methods: ["POST"],
        },
        "admin.produk.update": {
            uri: "admin/manajemen-produk/{produk}",
            methods: ["PUT"],
            parameters: ["produk"],
            bindings: { produk: "id" },
        },
        "admin.produk.delete": {
            uri: "admin/manajemen-produk/{produk}",
            methods: ["DELETE"],
            parameters: ["produk"],
            bindings: { produk: "id" },
        },
        "user.tutorial": { uri: "user/tutorial", methods: ["GET", "HEAD"] },
        "user.tutorial.search": {
            uri: "user/tutorial/search",
            methods: ["GET", "HEAD"],
        },
        "user.ulasan": { uri: "user/ulasan", methods: ["GET", "HEAD"] },
        "user.register": { uri: "user/register", methods: ["GET", "HEAD"] },
        "register.post": { uri: "register", methods: ["POST"] },
        login: { uri: "login", methods: ["POST"] },
        "user.FaQ": {
            uri: "user/FaQ",
            methods: ["GET", "HEAD"]
        },
    },
};
if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
