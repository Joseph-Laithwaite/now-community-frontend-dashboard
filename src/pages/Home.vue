<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">Your Story Starts With Us.</h1>
            <h4>
              Every landing page needs a small description after the big bold
              title, that's why we added this text here. Add here all the
              information that can make you or your product create the first
              impression.
            </h4>
            <br />
            <md-button
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              class="md-success md-lg"
              target="_blank"
              ><i class="fas fa-play"></i> Watch video</md-button
            >
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center"
            >
              <!--h2 class="title text-center">Our Mission</h2>
              <h5 class="description">
                We’re working hard to create an easy and convenient online market place for all your favourite Independent businesses here in Portsmouth.
                <br/>
                Whether it’s fresh bread, veg, meat or whole foods we’ll have you covered in no time making it easy to set up one time, weekly, biweekly or monthly deliveries contact free to your door.
              </h5-->
              <h2 class="title text-center">Our Goal</h2>
              <h5 class="description">
                At Now Community we're working to create a more convenient zero waste world.
                <br> 
                We are making it easy for you to support local businesses, to hold those businesses accountable for the waste they produce and the waste they push on to us the consumers. 
                <br>
                By building a network of independent businesses willing to sell their amazing produce in re-usable containers that you can drop off at any other local business. 
                <br>
                Making an easy to use online marketplace where you can quickly get your weekly shop delivered (or ready for collection in one place) whilst supporting your local independent businesses and getting it all delivered with a minimum of waste. 
                <br>
                What's not to love?
              </h5>
            </div>
          </div>
          <div class="features text-center">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-info">
                    <md-icon>storefront</md-icon>
                  </div>
                  <h4 class="info-title">Free Market Place for Independents</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-success">
                    <md-icon>local_shipping</md-icon>
                  </div>
                  <h4 class="info-title">Unified Delivery & Collection</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-danger">
                    <md-icon>loop</md-icon>
                  </div>
                  <h4 class="info-title">Plastic Free Packaging</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section text-center pt-100">
        <div class="container">
          <h2 class="title">Our Independents</h2>
          <div class="independents">
            <div class="md-layout">
              <div v-for="(independent, index) in independents" :key="index" class="md-layout-item md-medium-size-33 md-small-size-100">
                <independent-card :independent="independent"></independent-card>  
              </div>
            </div>
          </div>
        </div>
      </div>
      <contact-us>
        <template v-slot:title>
          Work with us?
        </template>
        <template v-slot:description>
          Provide details about your product or agency work into parts.
          Write a few lines about each one and contact us about any
          further collaboration. We will responde get back to you in a
          couple of hours.
        </template>
      </contact-us>
    </div>
  </div>
</template>

<script>

import IndependentCard from "../components/Cards/IndependentCard";
import ContactUs from "../components/ContactUs.vue";
import Parallax from "../components/Parallax";

export default {
  components: {
    IndependentCard,
    ContactUs,
    Parallax
  },
  // bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: "https://pro2-bar-s3-cdn-cf6.myportfolio.com/d0dfdbef-a4b8-45ef-9f5b-c8ffcff5b9ec/09cd778f-218a-4a33-8e0d-bb5751bfcd0e_rwc_31x0x4697x2662x4096.jpg" //require("@/assets/img/bg7.jpg")
    },
  },
  data() {
    return {
      independents:[
      {
        name: "Sundays Coffee",
        imageUrl: require("../assets/img/independents/sundays_coffee.jpeg"),
        description: "Portsmouth based independent coffee roaster, roasting responsibly sourced specialty coffee. Originally began roasting at Canvas Coffee when we were closed on a Sunday",
        instagram: "www.instagram.com/sunday_coffee_roasters",
        facebook: null,
        website: "https://sundaycoffee.co.uk/",
        type: "Cafe"
      },
      {
        name: "Buck Shop",
        imageUrl: require("../assets/img/independents/buck_shop.jpg"),
        description: "Random gifts inspired by memes and trash TV.​​​​​​​",
        instagram: "https://www.instagram.com/buckshopgifts/",
        facebook: "https://www.facebook.com/buckshopgifts",
        website: "https://www.buckshop.co.uk/",
        type: "Gift Shop",
        coverUrl: "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.0-9/89921165_105450524430563_3564448755438583808_n.jpg?_nc_cat=104&_nc_sid=dd9801&_nc_ohc=NUb7PKZIxEgAX-gyTaU&_nc_ht=scontent-lhr8-1.xx&oh=31a4554742958560d9aa183cd604266e&oe=5F994D1D"
      },
      {
        name: "Craft Styles",
        imageUrl: require("../assets/img/independents/craft_styles.jpeg"),
        description: "We are a husband and wife creating hand thrown glazed pots/ceramic items also a selection of framed/mounted paintings in different styles and mediums of landscapes/ seascapes/animals in various mediums and hand painted cards our work can be seen on our website.",
        instagram: "https://www.instagram.com/craft.styles",
        facebook: null,
        website: "https://craftstyles.co.uk/",
        type: "Potters"
      }],
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
  }
};
</script>

<style lang="scss" scoped>
.contact-form {
  margin-top: 30px;
}

.md-has-textarea + .md-layout {
  margin-top: 15px;
}
</style>
