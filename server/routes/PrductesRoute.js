// routes/ProductRoute.js
require('../connection')
const express = require('express');
const router = express.Router();
const Product = require('../schema/Product');
const Simple = require('../schema/Simple')
const multer = require('multer');
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier');


// Example route


// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
  // timeout: 60000 // 60 seconds
});


// Multer Setup (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/hello', (req, res) => {
  res.send('👋 Hello from product route!');
});





// ...existing code...

router.post('/add-product', upload.array('images'), async (req, res) => {
  try {
    const files = req.files;
    const {
      marchantName,
      marchantEmail,
      name,
      brand,
      price,
      originalPrice,
      discount,
      category,
      subcategory,
      inStock,
      stockCount,
      sku,
      description,
      features,
      colors,
      sizes
    } = req.body;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No images provided' });
    }

    // Helper to upload a single image buffer to Cloudinary
    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: name || "products",
            timeout: 120000 // 2 minutes
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });
    };

    // Upload all images and get their URLs
    const uploadedImages = await Promise.all(
      files.map(file => uploadToCloudinary(file.buffer))
    );

    // Parse fields if sent as JSON strings
    let parsedFeatures = features;
    let parsedColors = colors;
    let parsedSizes = sizes;
 

    try {
      if (typeof features === "string") parsedFeatures = JSON.parse(features);
      if (typeof colors === "string") parsedColors = JSON.parse(colors);
      if (typeof sizes === "string") parsedSizes = JSON.parse(sizes);

    } catch (e) {
      // ignore parse errors, fallback to original values
    }

    // Create new product
    const newProduct = new Product({
      marchantName,
      marchantEmail,
      name,
      brand,
      price,
      originalPrice,
      discount,
      images: uploadedImages,
      category,
      subcategory,
      inStock,
      stockCount,
      sku,
      description,
      features: parsedFeatures,
      colors: parsedColors,
      sizes: parsedSizes,
      // reviews, rating, totalReviews will use defaults
    });

    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("back-end error Error adding product:", error);
    res.status(500).json({ message: "Failed to add product from back-end", error: error.message });
  }
});

router.post('/simple', async(req, res)=>{
try {
    const {name, email, password} = req.body;

    console.log(name, email, password)

  const SimpleData = new Simple({
    name,
    email,
    password
  });

  await SimpleData.save();
  res.status(201).json({message:'simple data successfully sent to the database'})
} catch (error) {
  console.error("simple data:", error);
    res.status(500).json({ message: "simple data error", error: error.message });
}
})

router.get('/all-products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});


router.get('/product-detail', async (req, res) => {
  try {
    // You can filter by query params if needed, e.g. ?id=...
    const { id } = req.query;

    if (id) {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    }
 
  } catch (error) {
    console.error("Error fetching product(s):", error);
    res.status(500).json({ message: "Failed to fetch product(s)", error: error.message });
  }
});




router.put('/edit-product/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Parse fields if sent as JSON strings
    let {
      name,
      brand,
      price,
      originalPrice,
      discount,
      category,
      subcategory,
      inStock,
      stockCount,
      sku,
      description,
      features,
      colors,
      sizes,
      rating,
      totalReviews
    } = req.body;

    try {
      if (typeof features === "string") features = JSON.parse(features);
      if (typeof colors === "string") colors = JSON.parse(colors);
      if (typeof sizes === "string") sizes = JSON.parse(sizes);

    } catch (e) {
      // ignore parse errors, fallback to original values
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        marchantName,
        marchantEmail,
        name,
        brand,
        price,
        originalPrice,
        discount,
        category,
        subcategory,
        inStock,
        stockCount,
        sku,
        description,
        features,
        colors,
        sizes,
        rating,
        totalReviews
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
});




router.delete('/delete-product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('deleted id:', id);

    // Find the product first to get image URLs
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from Cloudinary
    if (Array.isArray(product.images)) {
      // Extract public_id from each image URL
      const deletePromises = product.images.map(async (imgUrl) => {
        try {
          // Cloudinary URLs are like: https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<public_id>.<ext>
          // Extract public_id (between /upload/ and .ext)
          const matches = imgUrl.match(/\/upload\/(?:v\d+\/)?([^\.\/]+)(?:\.[a-zA-Z0-9]+)?$/);
          const publicId = matches && matches[1] ? matches[1] : null;
          if (publicId) {
            await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
          }
        } catch (err) {
          // Log and continue
          console.error('Cloudinary image delete error:', err.message);
        }
      });
      await Promise.all(deletePromises);
    }

    // Delete product from DB
    const deletedProduct = await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product and images deleted successfully", product: deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
});


router.get("/marchant-product-list/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;
  if(!userEmail){throw console.error('user email not found')}
  console.log('user Email', userEmail)
    const products = await Product.find({ marchantEmail: userEmail });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching marchant products:", error);
    res.status(500).json({ message: "Failed to fetch marchant products", error: error.message });
  }
});


router.get("/product-category/:category", async (req, res) => {
  try {
    const category = req.params.category;
  if(!category){throw console.error('Category not exist')}
  console.log('Product category', category)
    const products = await Product.find({ category: category });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching catrogy product:", error);
    res.status(500).json({ message: "Failed to fetch category products", error: error.message });
  }
});


router.get('/search', async (req, res) => {
  const { q } = req.query;
  console.log('query name is:',q)
  if (!q) return res.status(400).json({ error: 'Missing query param ?q=' });

  try {
    const regex = new RegExp(q, 'i'); // Case-insensitive regex
    const results = await Product.find({
      $or: [
        { name: regex },
        { brand: regex },
        { category: regex },
        { subcategory: regex },
      ]
    });

        res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Example Express route
router.post('/cart-items', async (req, res) => {
  try {
    const ids = req.body; // should be an array of IDs
    const products = await Product.find({ _id: { $in: ids } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart items", error: error.message });
  }
});

module.exports = router;
