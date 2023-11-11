
const ecommerceService = require("../services/ecommerce-service")


// ecommerce - add product
exports.addProduct = async (req, res) => {
    try {
        const productData = req.body;
        const { productName, file, price, discount, externalLink, description } = productData;

        if (!productName || !file || !price || !discount || !externalLink || !description) {
            return res.status(400).json({ status: false, message: "invalid productData inputs" })
        }

        if (typeof price !== "number") {
            return res.status(400).send({ status: false, message: "price should me number" })
        }
        if (typeof discount !== "number") {
            return res.status(400).send({ status: false, message: "discount should me number" })
        }
        // i have to add file code , for adding file name in db
        const addedProduct = await ecommerceService.addProduct(productData);
        return res.status(201).json({ status: "success", data: addedProduct })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


// get products
exports.getProducts = async (req, res) => {
    try {
        const { pageNo, limit } = req.body;
        if (!pageNo || !limit) {
            return res.status(400).send({ status: false, message: "invalid inputs" })
        }

        const skipProducts = (pageNo - 1) * limit
        const products = await ecommerceService.getProducts(skipProducts, limit);

        if (products.length === 0) {
            return res.status(404).send({ status: false, message: "products not available" })
        }

        return res.status(200).send({ status: true, totalProducts: products.length, products })

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}
