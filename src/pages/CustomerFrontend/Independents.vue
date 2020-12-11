<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100">
            <h1 class="title">We Create Market.</h1>
            <h4>
              Shop local and support a market brimming with an inspiring section of talented 
              local makers, artists, designers, creators and much more!
            </h4>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center">
                <h2 class="title text-center">Our Independents</h2>
                <div class="independents">
                    <div class="md-layout">
                        <div v-for="(independent, index) in independents" :key="index" class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                            <independent-card :independent="independent"></independent-card>  
                        </div>
                    </div>
                </div> 
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>

import IndependentCard from "../components/cards/IndependentCard.vue";

export default {
  components: {
    IndependentCard,
  },
  bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: "https://pro2-bar-s3-cdn-cf6.myportfolio.com/d0dfdbef-a4b8-45ef-9f5b-c8ffcff5b9ec/09cd778f-218a-4a33-8e0d-bb5751bfcd0e_rwc_31x0x4697x2662x4096.jpg"
    },
  },
  data() {
    return {
      independents:[
      {
        name: "Sundays Coffee",
        imageUrl: require("@/assets/img/independents/sundays_coffee.jpeg"),
        description: "Portsmouth based independent coffee roaster, roasting responsibly sourced specialty coffee. Originally began roasting at Canvas Coffee when we were closed on a Sunday",
        instagram: "www.instagram.com/sunday_coffee_roasters",
        facebook: null,
        website: "https://sundaycoffee.co.uk/",
        type: "Cafe"
      },
      {
        name: "Buck Shop",
        imageUrl: require("@/assets/img/independents/buck_shop.jpg"),
        description: "Random gifts inspired by memes and trash TV.​​​​​​​",
        instagram: "https://www.instagram.com/buckshopgifts/",
        facebook: "https://www.facebook.com/buckshopgifts",
        website: "https://www.buckshop.co.uk/",
        type: "Gift Shop",
        coverUrl: "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.0-9/89921165_105450524430563_3564448755438583808_n.jpg?_nc_cat=104&_nc_sid=dd9801&_nc_ohc=NUb7PKZIxEgAX-gyTaU&_nc_ht=scontent-lhr8-1.xx&oh=31a4554742958560d9aa183cd604266e&oe=5F994D1D"
      },
      {
        name: "Craft Styles",
        imageUrl: require("@/assets/img/independents/craft_styles.jpeg"),
        description: "We are a husband and wife creating hand thrown glazed pots/ceramic items also a selection of framed/mounted paintings in different styles and mediums of landscapes/ seascapes/animals in various mediums and hand painted cards our work can be seen on our website.",
        instagram: "https://www.instagram.com/craft.styles",
        facebook: null,
        website: "https://craftstyles.co.uk/",
        type: "Potters"
      },{
        name: "Sundays Coffee",
        imageUrl: require("@/assets/img/independents/sundays_coffee.jpeg"),
        description: "Portsmouth based independent coffee roaster, roasting responsibly sourced specialty coffee. Originally began roasting at Canvas Coffee when we were closed on a Sunday",
        instagram: "www.instagram.com/sunday_coffee_roasters",
        facebook: null,
        website: "https://sundaycoffee.co.uk/",
        type: "Cafe"
      },
      {
        name: "Buck Shop",
        imageUrl: require("@/assets/img/independents/buck_shop.jpg"),
        description: "Random gifts inspired by memes and trash TV.​​​​​​​",
        instagram: "https://www.instagram.com/buckshopgifts/",
        facebook: "https://www.facebook.com/buckshopgifts",
        website: "https://www.buckshop.co.uk/",
        type: "Gift Shop",
        coverUrl: "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.0-9/89921165_105450524430563_3564448755438583808_n.jpg?_nc_cat=104&_nc_sid=dd9801&_nc_ohc=NUb7PKZIxEgAX-gyTaU&_nc_ht=scontent-lhr8-1.xx&oh=31a4554742958560d9aa183cd604266e&oe=5F994D1D"
      },
      {
        name: "Craft Styles",
        imageUrl: require("@/assets/img/independents/craft_styles.jpeg"),
        description: "We are a husband and wife creating hand thrown glazed pots/ceramic items also a selection of framed/mounted paintings in different styles and mediums of landscapes/ seascapes/animals in various mediums and hand painted cards our work can be seen on our website.",
        instagram: "https://www.instagram.com/craft.styles",
        facebook: null,
        website: "https://craftstyles.co.uk/",
        type: "Potters"
      },{
        name: "Sundays Coffee",
        imageUrl: require("@/assets/img/independents/sundays_coffee.jpeg"),
        description: "Portsmouth based independent coffee roaster, roasting responsibly sourced specialty coffee. Originally began roasting at Canvas Coffee when we were closed on a Sunday",
        instagram: "www.instagram.com/sunday_coffee_roasters",
        facebook: null,
        website: "https://sundaycoffee.co.uk/",
        type: "Cafe"
      },
      {
        name: "Buck Shop",
        imageUrl: require("@/assets/img/independents/buck_shop.jpg"),
        description: "Random gifts inspired by memes and trash TV.​​​​​​​",
        instagram: "https://www.instagram.com/buckshopgifts/",
        facebook: "https://www.facebook.com/buckshopgifts",
        website: "https://www.buckshop.co.uk/",
        type: "Gift Shop",
        coverUrl: "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.0-9/89921165_105450524430563_3564448755438583808_n.jpg?_nc_cat=104&_nc_sid=dd9801&_nc_ohc=NUb7PKZIxEgAX-gyTaU&_nc_ht=scontent-lhr8-1.xx&oh=31a4554742958560d9aa183cd604266e&oe=5F994D1D"
      },
      {
        name: "Craft Styles",
        imageUrl: require("@/assets/img/independents/craft_styles.jpeg"),
        description: "We are a husband and wife creating hand thrown glazed pots/ceramic items also a selection of framed/mounted paintings in different styles and mediums of landscapes/ seascapes/animals in various mediums and hand painted cards our work can be seen on our website.",
        instagram: "https://www.instagram.com/craft.styles",
        facebook: null,
        website: "https://craftstyles.co.uk/",
        type: "Potters"
      },{
        name: "Sundays Coffee",
        imageUrl: require("@/assets/img/independents/sundays_coffee.jpeg"),
        description: "Portsmouth based independent coffee roaster, roasting responsibly sourced specialty coffee. Originally began roasting at Canvas Coffee when we were closed on a Sunday",
        instagram: "www.instagram.com/sunday_coffee_roasters",
        facebook: null,
        website: "https://sundaycoffee.co.uk/",
        type: "Cafe"
      },
      {
        name: "Buck Shop",
        imageUrl: require("@/assets/img/independents/buck_shop.jpg"),
        description: "Random gifts inspired by memes and trash TV.​​​​​​​",
        instagram: "https://www.instagram.com/buckshopgifts/",
        facebook: "https://www.facebook.com/buckshopgifts",
        website: "https://www.buckshop.co.uk/",
        type: "Gift Shop",
        coverUrl: "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.0-9/89921165_105450524430563_3564448755438583808_n.jpg?_nc_cat=104&_nc_sid=dd9801&_nc_ohc=NUb7PKZIxEgAX-gyTaU&_nc_ht=scontent-lhr8-1.xx&oh=31a4554742958560d9aa183cd604266e&oe=5F994D1D"
      },
      {
        name: "Craft Styles",
        imageUrl: require("@/assets/img/independents/craft_styles.jpeg"),
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
