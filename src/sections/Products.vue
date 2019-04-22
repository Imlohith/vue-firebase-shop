<template>
  <div class="products" id="products">
     <div class="container">
    <hr>
    <div class="row">
        <div class="col-md-3 col-sm-6" v-for="product in products" :key="product.id">
            <div class="product-grid9">
                <div class="product-image9">
                    <a @click="loadProduct(product.userId)">
                       <img class="pic-1" :src="product.images[0]">
                    </a>
                </div>
                <div class="product-content">
                    <ul class="rating">
                        <li class="fa fa-star"></li>
                        <li class="fa fa-star"></li>
                        <li class="fa fa-star"></li>
                        <li class="fa fa-star disable"></li>
                        <li class="fa fa-star disable"></li>
                    </ul>
                    <h3 class="title"><a href="#">{{ product.storeName }}</a></h3>
                    <div class="price"> <i class="fa fa-inr"></i> {{ product.price}}</div>
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
        loadProduct (id) {
            this.$router.push('/proview/' + id)
         }
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
        h3.h3{text-align:center;margin:1em;text-transform:capitalize;font-size:1.7em;}


/********************* Shopping Demo-9 **********************/
.product-grid9,.product-grid9 .product-image9{position:relative}
.product-grid9{font-family:Poppins,sans-serif;z-index:1}
.product-grid9 .product-image9 a{display:block}
.product-grid9 .product-image9 img{width:100%;height:300px}
.product-grid9 .pic-2{position:absolute;top:0;left:0;opacity:0;transition:all .5s ease-out 0s}
.product-grid9:hover .pic-2{opacity:1}
.product-grid9 .product-full-view{color:#505050;background-color:#fff;font-size:16px;height:45px;width:45px;padding:18px;border-radius:100px 0 0;display:block;opacity:0;position:absolute;right:0;bottom:0;transition:all .3s ease 0s}
.product-grid9 .product-full-view:hover{color:#c0392b}
.product-grid9:hover .product-full-view{opacity:1}
.product-grid9 .product-content{padding:12px 12px 0;overflow:hidden;position:relative}
.product-content .rating{padding:0;margin:0 0 7px;list-style:none}
.product-grid9 .rating li{font-size:12px;color:#ffd200;transition:all .3s ease 0s}
.product-grid9 .rating li.disable{color:rgba(0,0,0,.2)}
.product-grid9 .title{font-size:16px;font-weight:400;text-transform:capitalize;margin:0 0 3px;transition:all .3s ease 0s}
.product-grid9 .title a{color:rgba(0,0,0,.5)}
.product-grid9 .title a:hover{color:#c0392b}
.product-grid9 .price{color:#000;font-size:17px;margin:0;display:block;transition:all .5s ease 0s}
.product-grid9:hover .price{opacity:0}
.product-grid9 .add-to-cart{display:block;color:#c0392b;font-weight:600;font-size:14px;opacity:0;position:absolute;left:10px;bottom:-20px;transition:all .5s ease 0s}
.product-grid9:hover .add-to-cart{opacity:1;bottom:0}
@media only screen and (max-width:990px){.product-grid9{margin-bottom:30px}
}
</style>
