<template>
   <div class="container">
  <div class="row">
    <div class="col-12">
      <div class="card mt-3 tab-card">
        <div class="card-header tab-card-header">
          <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link" id="one-tab" data-toggle="tab" href="#one" role="tab" aria-controls="One" aria-selected="true">Complete description</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="two-tab" data-toggle="tab" href="#two" role="tab" aria-controls="Two" aria-selected="false">Quote review</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="three-tab" data-toggle="tab" href="#three" role="tab" aria-controls="Three" aria-selected="false">Reviews</a>
            </li>
          </ul>
        </div>

        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active p-3" id="one" role="tabpanel" aria-labelledby="one-tab">
            <h5 class="card-title">Complete description</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic, a!</p>
            <p>345345</p>             
          </div>
          <div class="tab-pane fade p-3" id="two" role="tabpanel" aria-labelledby="two-tab">
            <h5 class="card-title">Quote reviews</h5>
              <form action="">
                   <div class="form-group">
                       <label for="">Name</label>
                       <input type="text" v-model="name" class="form-control">
                   </div>
                   <div class="form-group">
                       <label for="">Email</label>
                       <input type="text" v-model="email" class="form-control">
                   </div>
                   <div class="form-group">
                       <label for="">review</label>
                       <textarea v-model="review" id="" cols="30" rows="10"></textarea>
                   </div>
                   <div class="form-group">
                       <button type="submit" class="btn btn-primary" @click="addComment">Submit</button>
                   </div>
              </form>                    
          </div>
          <div class="tab-pane fade p-3" id="three" role="tabpanel" aria-labelledby="three-tab">
            <h5 class="card-title">Reviews</h5>
               <div v-for="review in reviews" :key="review.name">
                   <h3>{{ review.name }}</h3>
                   <p>{{ review.email }}</p>
                   <p>{{ review.reviewDB }}</p>
                   <hr>
               </div>
           </div>
        </div>
      </div>
    </div>
  </div>
   </div> 
</template>

<script>
import { mapState } from 'vuex';
const fb = require('../firebase')
    export default {
        data() {
            return {
                name: '',
                email: '',
                review: '',
                reviews: []
            }
        },
        computed: {
            ...mapState(["currentUser", "userProfile", "products"])
        },
        mounted() {
          fb.reviewDB.get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                    let post = doc.data()
                    post.id = doc.id
                    this.reviews.push(post)
              })
          })
        },
        methods: {
            addComment() {
                fb.reviewDB.add({
                    name: this.name,
                    email: this.email,
                    reviewDB: this.review
                }).then(() => {
                    Toast.fire({
                    type: "success",
                    title: "Review added successfully"
                  });
                    this.name= ''
                    this.email = ''
                    this.review = ''
                })
                .catch(err => {
                  throw err
                })
            }
        }
    }
</script>

<style scoped>
body {
    background-color: #f7f8f9;
}

.card {
    background-color: #ffffff;
    border: 1px solid rgba(0, 34, 51, 0.1);
    box-shadow: 2px 4px 10px 0 rgba(0, 34, 51, 0.05), 2px 4px 10px 0 rgba(0, 34, 51, 0.05);
    border-radius: 0.15rem;
}

/* Tabs Card */

.tab-card {
  border:1px solid #eee;
}

.tab-card-header {
  background:none;
}
/* Default mode */
.tab-card-header > .nav-tabs {
  border: none;
  margin: 0px;
}
.tab-card-header > .nav-tabs > li {
  margin-right: 2px;
}
.tab-card-header > .nav-tabs > li > a {
  border: 0;
  border-bottom:2px solid transparent;
  margin-right: 0;
  color: #737373;
  padding: 2px 15px;
}

.tab-card-header > .nav-tabs > li > a.show {
    border-bottom:2px solid #007bff;
    color: #007bff;
}
.tab-card-header > .nav-tabs > li > a:hover {
    color: #007bff;
}

.tab-card-header > .tab-content {
  padding-bottom: 0;
}
</style>