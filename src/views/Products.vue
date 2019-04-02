<template>
  <div class="products">
      <div class="container">
          
        <div class="intro h-100">
            <div class="row h-100 justify-content-center align-items-center">
              <div class="col-md-6">
                    <h3>Products Page</h3>
                    
                 <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.
                 </p>
              </div>
              <div class="col-md-6">
                  <img src="/img/svg/products.svg" alt="" class="img-fluid">
              </div>
            </div>
          </div>

          <hr>

          <div class="product-test">


            <h3 class="d-inline-block">Products list</h3>
            <button @click="addNew" class="btn btn-primary float-right">Add Product</button>

            <div class="table-responsive">
               
                <table class="table" >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Modify</th>
                    </tr>
                  </thead>
                   <div class="d-flex justify-content-center"  v-if="loading">
                                <div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                </div>
                  <tbody v-if="products.length">
                      <tr v-for="product in products">
                        <td>
                          {{product.productName}}
                        </td>

                        <td>
                          {{product.price}}
                        </td>

                        <td>

                          <button class="btn btn-primary" @click="editProduct(product)">Edit</button>
                          <button class="btn btn-danger" @click="deleteProduct(product)">Delete</button>
                        </td>

                      </tr>


                  </tbody>
                  <span v-else>There are no currently products available</span>
                </table>
            </div>

          </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editLabel">Edit Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>

                    <div class="form-group">
                      <vue-editor v-model="product.description"></vue-editor>
                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <div class="form-group">
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>

                    <div class="form-group">
                      <input type="text" @keyup.188="addTag" placeholder="Product tags" v-model="tag" class="form-control">
                      
                      <div  class="d-flex">
                        <p v-for="tag in product.tags">
                            <span class="p-1">{{tag}}</span>
                        </p>

                      </div>
                    </div>


                    <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file" @change="uploadImage" class="form-control">
                    </div>

                    <div class="form-group d-flex">
                      <div class="p-1" v-for="image in product.images">
                          <img :src="image" alt="" width="80px">
                          <span class="delete-img" @click="deleteImage(image, index)">X</span>
                      </div>
                    </div>

                  </div>
                </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">Save changes</button>
              <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply changes</button>
            </div>
          </div>
        </div>
      </div>


    
  </div>
</template>

<script>
import { mapState } from "vuex";
import { VueEditor } from "vue2-editor";
const fb = require("../firebase");

export default {
  name: "Products",
  components: {
    VueEditor
  },
  props: {
    msg: String
  },

  data() {
    return {
      product: {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: []
      },
      loading: false,
      activeItem: null,
      modal: null,
      tag: null
    };
  },
  computed: {
    ...mapState(["currentUser", "userProfile", "products"])
  },
  // mounted() {
  //   this.$binding("products", fb.productsCollection).then(products => {
  //     products = products;
  //   });
  // },
  methods: {
    deleteImage(img, index) {
      let image = fb.storage().refFromURL(img);
      this.product.images.splice(index, 1);
      image
        .delete()
        .then(function() {
          console.log("image deleted");
        })
        .catch(function(error) {
          // Uh-oh, an error occurred!
          console.log("an error occurred");
        });
    },
    addTag() {
      this.product.tags.push(this.tag);
      this.tag = "";
    },
    uploadImage(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];

        var storageRef = fb
          .storage()
          .ref("products/" + Math.random() + "_" + file.name);

        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.product.images.push(downloadURL);
              console.log("File available at", downloadURL);
            });
          }
        );
      }
    },

    reset() {
      this.product = {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: []
      };
    },
    addNew() {
      this.modal = "new";
      this.reset();
      $("#product").modal("show");
    },

    updateProduct() {
      fb.productsCollection.doc(this.product.id).update(this.product)
      .then(() => {
          Toast.fire({
          type: "success",
          title: "Updated  successfully"
        });
      })
      .catch(err => {
        throw err
      })
      // this.$firestore.products.doc(this.product.id).update(this.product);
      $("#product").modal("hide");
    },

    editProduct(product) {
      this.modal = "edit";
      this.product = product;
      $("#product").modal("show");
    },

    deleteProduct(doc) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          fb.productsCollection.doc(doc['id']).delete()
          .then(() => {
             Toast.fire({
            type: "success",
            title: "Deleted  successfully"
          });
          })
          .catch(err => {
            throw err
          })         
        }
      });
    },
    readData() {},
    addProduct() {
      // this.$firestore.products.add(this.product);
      fb.productsCollection
        .add({
          createdOn: new Date(),
          userId: this.currentUser.uid,
          productName: this.product.name,
          description: this.product.description,
          price: this.product.price,
          tags: this.product.tags,
          images: this.product.images
        })
        .then(() => {
          Toast.fire({
            type: "success",
            title: "Product created successfully"
          });
          (this.product.name = ""),
            (this.product.description = ""),
            (this.product.price = ""),
            (this.product.tags = ""),
            (this.product.images = ""),
            $("#product").modal("hide");
        })
        .catch(err => {
          throw err;
        });
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
