<template>
  <div class="products" id="products">
      <div class="container">
          <h1 class="text-center p-5">Our Products</h1>
          <div class="row">
              <div class="col-md-4" v-for="product in products" :key="product.id">
                  <div class="card product-item">
                    <img :src="product.images[0]" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">{{ product.storeName }}</h5>
                            <p class="card-text" >
                               {{ product.description }}
                            </p>
                             <p class="card-text">INR
                               {{ product.price }}
                            </p>
                            <a href="#" class="btn btn-primary">Add to Cart</a>
                        </div>
                    </div>
              </div>
          </div>
      </div>
    
  </div>
</template>

<script>
const fb = require('../firebase.js')
import { mapState } from 'vuex'
export default {
  name: "Products",
  props: {
    msg: String
  },
  data() {
      return {
          products: [],
      }
  },
  computed: {
    ...mapState(['currentUser']),
  },
  methods: {
         
  },
   mounted() {
            this.$binding("products", fb.productsCollection).then(products => {
            this.products = products;
            });
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .products{
        margin-top: 7rem;
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
</style>
