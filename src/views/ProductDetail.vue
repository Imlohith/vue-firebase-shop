<template>
    <div class="container">
    <router-link class="navbar-brand" to="/">Vue Shop</router-link>
	<br>  <h2 class="text-center"><span style="color:green;">{{ storeName }}</span></h2>
<hr>
<div class="card">
	<div class="row">
		<aside class="col-sm-5 border-right">
<article class="gallery-wrap"> 
<div class="img-big-wrap">
  <div> <a href="#"><img :src="images" style="max-height:500px;width:400px;"></a></div>
</div> <!-- slider-product.// -->
</article> <!-- gallery-wrap .end// -->
		</aside>
		<aside class="col-sm-7">
<article class="card-body p-5">
	<h3 class="title mb-3">{{ productName }}</h3>

<p class="price-detail-wrap"> 
	<span class="price h3 text-warning"> 
		<span class="currency"><i class="fa fa-inr"></i></span><span class="num"> {{ price }}</span>
	</span> 
</p> <!-- price-detail-wrap .// -->
<dl class="item-property">

    <dt>Description</dt>
  <dd><p>{{ description }}</p></dd>
</dl>
<dl class="param param-feature">
  <dt>tags</dt>
  <dd v-for="tag in tags" :key="tag.id">
      {{ tag }}
  </dd>
</dl>  <!-- item-property-hor .// -->
<dl class="param param-feature">
  <dt>Color</dt>
  <dd>Black and white</dd>
</dl>  <!-- item-property-hor .// -->
<dl class="param param-feature">
  <dt>Address</dt>
  <dd>lelamahal, tirupati</dd>
</dl>  <!-- item-property-hor .// -->
</article> <!-- card-body.// -->
		</aside> <!-- col.// -->
	</div> <!-- row.// -->
   
</div> <!-- card.// -->


     
        <div class="row mt-4">
            <div class="col-md-9">
                <h3>
                    You might also look in near stores</h3>
            </div>
        </div>
        <div id="carousel-example" class="carousel slide hidden-xs" data-ride="carousel">
            <!-- Wrapper for slides -->
            <div class="carousel-inner">
                <div class="item active">
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="col-item">
                                <div class="photo">
                                    <img src="/img/products/mobile-2.jpg" class="img-responsive" alt="a" />
                                </div>
                                <div class="info">
                                    <div class="row">
                                        <div class="price col-md-6">
                                            <h5>
                                                Sample Product</h5>
                                            <h5 class="price-text-color">
                                                <i class="fa fa-inr"></i>  199.99</h5>
                                        </div>
                                    </div>
                                     <div class="separator clear-left">
                                        <p class="btn-details">
                                            <i class="fa fa-list"></i><a href="#" class="hidden-sm">More details</a></p>
                                    </div>
                                    <div class="clearfix">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="col-item">
                                <div class="photo">
                                    <img src="/img/products/mobile-2.jpg" class="img-responsive" alt="a" />
                                </div>
                                <div class="info">
                                    <div class="row">
                                        <div class="price col-md-6">
                                            <h5>
                                                Product Example</h5>
                                            <h5 class="price-text-color">
                                                 <i class="fa fa-inr"></i> 249.99</h5>
                                        </div>
                                        <div class="rating hidden-sm col-md-6">
                                        </div>
                                    </div>
                                    <div class="separator clear-left">
                                        <p class="btn-details">
                                            <i class="fa fa-list"></i><a href="#" class="hidden-sm">More details</a></p>
                                    </div>
                                    <div class="clearfix">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="col-item">
                                <div class="photo">
                                    <img src="/img/products/mobile-3.jpg" class="img-responsive" alt="a" />
                                </div>
                                <div class="info">
                                    <div class="row">
                                        <div class="price col-md-6">
                                            <h5>
                                                 Sample Product</h5>
                                            <h5 class="price-text-color">
                                                 <i class="fa fa-inr"></i> 149.99</h5>
                                        </div>
                                    </div>
                                    <div class="separator clear-left">
                                        <p class="btn-details">
                                            <i class="fa fa-list"></i><a href="#" class="hidden-sm">More details</a></p>
                                    </div>
                                    <div class="clearfix">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="col-item">
                                <div class="photo">
                                    <img src="/img/products/mobile-4.jpg" class="img-responsive" alt="a" />
                                </div>
                                <div class="info">
                                    <div class="row">
                                        <div class="price col-md-6">
                                            <h5>
                                                Sample Product</h5>
                                            <h5 class="price-text-color">
                                                 <i class="fa fa-inr"></i> 199.99</h5>
                                        </div>
                                    </div>
                                    <div class="separator clear-left">
                            
                                        <p class="btn-details">
                                            <i class="fa fa-list"></i><a href="#" class="hidden-sm">More details</a></p>
                                    </div>
                                    <div class="clearfix">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>

   <div class="row mt-4">
            <div class="col-md-9">
                <h3>
                   Review and rating sections</h3>
            </div>
   </div>
   <Review></Review>
 
</div>
<!--container.//-->
</template>

<script>
import Review from '@/components/Review.vue'
const fb = require('../firebase.js')
import { mapState } from 'vuex';
    export default {
        props: ['id'],
        components: {
          Review
        },
        data() {
            return {
               storeName: '',
               description : '',
               price: '',
               images: '',
               productName: '',
               tags: [],
               createdOn: ''
            }
        },
        computed: { 
        //    ...mapState(['products'])
        },
        methods: {
            
        },
        mounted() {
           fb.productsCollection.where('userId', '==', this.id).get().then(docs => {
               docs.forEach(doc => {
                   console.log(doc.data())
                   let product = doc.data()
                   this.storeName=  product.storeName
                   this.description =  product.description
                   this.price =  product.price
                   this.images = product.images
                   this.productName = product.productName
                   this.tags = product.tags
                   this.createdOn =  product.createdOn
               })
           })
        },
    }
</script>

<style scoped>
@import url(http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css);
.col-item
{
    border: 1px solid #E1E1E1;
    border-radius: 5px;
    background: #FFF;
}
.col-item .photo img
{
    margin: 0 auto;
    width: 100%;
}

.col-item .info
{
    padding: 10px;
    border-radius: 0 0 5px 5px;
    margin-top: 1px;
}

.col-item:hover .info {
    background-color: #F5F5DC;
}
.col-item .price
{
    /*width: 50%;*/
    float: left;
    margin-top: 5px;
}

.col-item .price h5
{
    line-height: 20px;
    margin: 0;
}

.price-text-color
{
    color: #219FD1;
}

.col-item .info .rating
{
    color: #777;
}

.col-item .rating
{
    /*width: 50%;*/
    float: left;
    font-size: 17px;
    text-align: right;
    line-height: 52px;
    margin-bottom: 10px;
    height: 52px;
}

.col-item .separator
{
    border-top: 1px solid #E1E1E1;
}

.clear-left
{
    clear: left;
}

.col-item .separator p
{
    line-height: 20px;
    margin-bottom: 0;
    margin-top: 10px;
    text-align: center;
}

.col-item .separator p i
{
    margin-right: 5px;
}
.col-item .btn-add
{
    width: 50%;
    float: left;
}

.col-item .btn-add
{
    border-right: 1px solid #E1E1E1;
}

.col-item .btn-details
{
    width: 50%;
    float: left;
    padding-left: 10px;
}
.controls
{
    margin-top: 20px;
}
[data-slide="prev"]
{
    margin-right: 10px;
}

</style>