<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-75 md-small-size-100 mx-auto">
              <div class="profile">
                <div class="avatar">
                  <img
                    :src="independent.imageUrl"
                    :alt="independent.name + 'logo'"
                    class="img-raised rounded-circle img-fluid"
                  />
                </div>
                <independent-card
                  :independent="independent"
                  :show-image="false"
                  style="margin-top:-80px; margin-bottom:-80px;"
                ></independent-card>
              </div>
              <div class="profile-tabs">
                <tabs
                  :tab-name="['About Us', 'Book a Table', 'Shop Now']"
                  :tab-icon="['contact_page', 'book_online', 'store']"
                  plain
                  nav-pills-icons
                  color-button=""
                >
                  <template slot="tab-pane-1">
                      <contact-us></contact-us>
                  </template>
                  <template slot="tab-pane-2">
                    <div class="md-layout">          
                        
                    </div>
                  </template>
                  <template slot="tab-pane-3">
                    <div class="md-layout">
                        <div v-for="(product, index) in products" :key="index" 
                          class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-50"
                        >
                            <product-card :product="product"></product-card>  
                        </div>
                    </div>
                  </template>
                </tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs } from "@/components";
import IndependentCard from "../components/cards/IndependentCard.vue";
import ProductCard from "../components/cards/ProductCard.vue";
import ContactUs from "../components/ContactUs.vue";

export default {
  components: {
    Tabs,
    IndependentCard,
    ProductCard,
    ContactUs,
  },
  bodyClass: "profile-page",
  data() {
    return {
          products: 
          [{
          name: "Rwandan Washed whole bean",
          description: "Portsmouth based product coffee roaster, roasting responsibly sourced specialty coffee. Originally began roasting at Canvas Coffee when we were closed on a Sunday",
          brand:"Sundays Coffee",
          soldBy: ["Sundays Coffee","Wild Thyme Health Foods", "Herbies Health store"],
          brandCoverUrl: null,
          imageUrl: [require("@/assets/img/independents/sundays_coffee.jpeg"), "https://images.squarespace-cdn.com/content/v1/5ae73e1a697a9829e7ee084d/1593014222478-8KYJRKCF30966LUEGB1I/ke17ZwdGBToddI8pDm48kK60W-ob1oA2Fm-j4E_9NQB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0kD6Ec8Uq9YczfrzwR7e2Mh5VMMOxnTbph8FXiclivDQnof69TlCeE0rAhj6HUpXkw/IMG_7788.JPG"],          
          instagram: "www.instagram.com/sunday_coffee_roasters",
          facebook: null,
          website: "https://sundaycoffee.co.uk/",
          type: "Cafe",
          price: "1.20",
          salePrice: "1.00",
          deposit: "0.20"
        },
        {
          name: "Kenyan Natural whole bean",
          description: "Portsmouth based product coffee roaster, roasting responsibly sourced specialty coffee. Originally began roasting at Canvas Coffee when we were closed on a Sunday",
          brand:"Sundays Coffee",
          soldBy: ["Sundays Coffee","Wild Thyme Health Foods", "Herbies Health store"],
          brandCoverUrl: null,
          imageUrl: [require("@/assets/img/independents/sundays_coffee.jpeg"), "https://images.squarespace-cdn.com/content/v1/5ae73e1a697a9829e7ee084d/1593014222478-8KYJRKCF30966LUEGB1I/ke17ZwdGBToddI8pDm48kK60W-ob1oA2Fm-j4E_9NQB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0kD6Ec8Uq9YczfrzwR7e2Mh5VMMOxnTbph8FXiclivDQnof69TlCeE0rAhj6HUpXkw/IMG_7788.JPG"],          
          instagram: "www.instagram.com/sunday_coffee_roasters",
          facebook: null,
          website: "https://sundaycoffee.co.uk/",
          type: "Cafe",
          price: "1.20",
          salePrice: null,
          deposit: "0.20"
        },
        {
          name: "Ethiopean Washed Espresso Grind",
          description: "Portsmouth based product coffee roaster, roasting responsibly sourced specialty coffee. Originally began roasting at Canvas Coffee when we were closed on a Sunday",
          brand:"Sundays Coffee",
          soldBy: ["Sundays Coffee","Wild Thyme Health Foods", "Herbies Health store"],
          brandCoverUrl: null,
          imageUrl: [require("@/assets/img/independents/sundays_coffee.jpeg"), "https://images.squarespace-cdn.com/content/v1/5ae73e1a697a9829e7ee084d/1593014222478-8KYJRKCF30966LUEGB1I/ke17ZwdGBToddI8pDm48kK60W-ob1oA2Fm-j4E_9NQB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0kD6Ec8Uq9YczfrzwR7e2Mh5VMMOxnTbph8FXiclivDQnof69TlCeE0rAhj6HUpXkw/IMG_7788.JPG"],          
          instagram: "www.instagram.com/sunday_coffee_roasters",
          facebook: null,
          website: "https://sundaycoffee.co.uk/",
          type: "Cafe",
          price: "1.20",
          salePrice: "1.00",
          deposit: "0.20"
        },{
          name: "Rwandan Washed whole bean",
          description: "Portsmouth based product coffee roaster, roasting responsibly sourced specialty coffee. Originally began roasting at Canvas Coffee when we were closed on a Sunday",
          brand:"Sundays Coffee",
          soldBy: ["Sundays Coffee","Wild Thyme Health Foods", "Herbies Health store"],
          brandCoverUrl: null,
          imageUrl: [require("@/assets/img/independents/sundays_coffee.jpeg"), "https://images.squarespace-cdn.com/content/v1/5ae73e1a697a9829e7ee084d/1593014222478-8KYJRKCF30966LUEGB1I/ke17ZwdGBToddI8pDm48kK60W-ob1oA2Fm-j4E_9NQB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0kD6Ec8Uq9YczfrzwR7e2Mh5VMMOxnTbph8FXiclivDQnof69TlCeE0rAhj6HUpXkw/IMG_7788.JPG"],          
          instagram: "www.instagram.com/sunday_coffee_roasters",
          facebook: null,
          website: "https://sundaycoffee.co.uk/",
          type: "Cafe",
          price: "1.20",
          salePrice: "1.00",
          deposit: "0.20"
        },
        {
          name: "Rwandan Washed whole bean",
          description: "Portsmouth based product coffee roaster, roasting responsibly sourced specialty coffee. Originally began roasting at Canvas Coffee when we were closed on a Sunday",
          brand:"Sundays Coffee",
          soldBy: ["Sundays Coffee","Wild Thyme Health Foods", "Herbies Health store"],
          brandCoverUrl: null,
          imageUrl: [require("@/assets/img/independents/sundays_coffee.jpeg"), "https://images.squarespace-cdn.com/content/v1/5ae73e1a697a9829e7ee084d/1593014222478-8KYJRKCF30966LUEGB1I/ke17ZwdGBToddI8pDm48kK60W-ob1oA2Fm-j4E_9NQB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0kD6Ec8Uq9YczfrzwR7e2Mh5VMMOxnTbph8FXiclivDQnof69TlCeE0rAhj6HUpXkw/IMG_7788.JPG"],          
          instagram: "www.instagram.com/sunday_coffee_roasters",
          facebook: null,
          website: "https://sundaycoffee.co.uk/",
          type: "Cafe",
          price: "1.20",
          salePrice: "1.00",
          deposit: "0.20"
        },
        {
          name: "Rwandan Washed whole bean",
          description: "Portsmouth based product coffee roaster, roasting responsibly sourced specialty coffee. Originally began roasting at Canvas Coffee when we were closed on a Sunday",
          brand:"Sundays Coffee",
          soldBy: ["Sundays Coffee","Wild Thyme Health Foods", "Herbies Health store"],
          brandCoverUrl: null,
          imageUrl: [require("@/assets/img/independents/sundays_coffee.jpeg"), "https://images.squarespace-cdn.com/content/v1/5ae73e1a697a9829e7ee084d/1593014222478-8KYJRKCF30966LUEGB1I/ke17ZwdGBToddI8pDm48kK60W-ob1oA2Fm-j4E_9NQB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0kD6Ec8Uq9YczfrzwR7e2Mh5VMMOxnTbph8FXiclivDQnof69TlCeE0rAhj6HUpXkw/IMG_7788.JPG"],          
          instagram: "www.instagram.com/sunday_coffee_roasters",
          facebook: null,
          website: "https://sundaycoffee.co.uk/",
          type: "Cafe",
          price: "1.20",
          salePrice: "1.00",
          deposit: "0.20"
        },{
          name: "Rwandan Washed whole bean",
          description: "Portsmouth based product coffee roaster, roasting responsibly sourced specialty coffee. Originally began roasting at Canvas Coffee when we were closed on a Sunday",
          brand:"Sundays Coffee",
          soldBy: ["Sundays Coffee","Wild Thyme Health Foods", "Herbies Health store"],
          brandCoverUrl: null,
          imageUrl: [require("@/assets/img/independents/sundays_coffee.jpeg"), "https://images.squarespace-cdn.com/content/v1/5ae73e1a697a9829e7ee084d/1593014222478-8KYJRKCF30966LUEGB1I/ke17ZwdGBToddI8pDm48kK60W-ob1oA2Fm-j4E_9NQB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0kD6Ec8Uq9YczfrzwR7e2Mh5VMMOxnTbph8FXiclivDQnof69TlCeE0rAhj6HUpXkw/IMG_7788.JPG"],          
          instagram: "www.instagram.com/sunday_coffee_roasters",
          facebook: null,
          website: "https://sundaycoffee.co.uk/",
          type: "Cafe",
          price: "1.20",
          salePrice: "1.00",
          deposit: "0.20"
        },
        {
          name: "Rwandan Washed whole bean",
          description: "Portsmouth based product coffee roaster, roasting responsibly sourced specialty coffee. Originally began roasting at Canvas Coffee when we were closed on a Sunday",
          brand:"Sundays Coffee",
          soldBy: ["Sundays Coffee","Wild Thyme Health Foods", "Herbies Health store"],
          brandCoverUrl: null,
          imageUrl: [require("@/assets/img/independents/sundays_coffee.jpeg"), "https://images.squarespace-cdn.com/content/v1/5ae73e1a697a9829e7ee084d/1593014222478-8KYJRKCF30966LUEGB1I/ke17ZwdGBToddI8pDm48kK60W-ob1oA2Fm-j4E_9NQB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0kD6Ec8Uq9YczfrzwR7e2Mh5VMMOxnTbph8FXiclivDQnof69TlCeE0rAhj6HUpXkw/IMG_7788.JPG"],          
          instagram: "www.instagram.com/sunday_coffee_roasters",
          facebook: null,
          website: "https://sundaycoffee.co.uk/",
          type: "Cafe",
          price: "1.20",
          salePrice: "1.00",
          deposit: "0.20"
        },
        {
          name: "Rwandan Washed whole bean",
          description: "Portsmouth based product coffee roaster, roasting responsibly sourced specialty coffee. Originally began roasting at Canvas Coffee when we were closed on a Sunday",
          brand:"Sundays Coffee",
          soldBy: ["Sundays Coffee","Wild Thyme Health Foods", "Herbies Health store"],
          brandCoverUrl: null,
          imageUrl: [require("@/assets/img/independents/sundays_coffee.jpeg"), "https://images.squarespace-cdn.com/content/v1/5ae73e1a697a9829e7ee084d/1593014222478-8KYJRKCF30966LUEGB1I/ke17ZwdGBToddI8pDm48kK60W-ob1oA2Fm-j4E_9NQB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0kD6Ec8Uq9YczfrzwR7e2Mh5VMMOxnTbph8FXiclivDQnof69TlCeE0rAhj6HUpXkw/IMG_7788.JPG"],          
          instagram: "www.instagram.com/sunday_coffee_roasters",
          facebook: null,
          website: "https://sundaycoffee.co.uk/",
          type: "Cafe",
          price: "1.20",
          salePrice: "1.00",
          deposit: "0.20"
        }]
      }
  },
  props: {
    header: {
      type: String,
      default: "https://pro2-bar-s3-cdn-cf6.myportfolio.com/d0dfdbef-a4b8-45ef-9f5b-c8ffcff5b9ec/09cd778f-218a-4a33-8e0d-bb5751bfcd0e_rwc_31x0x4697x2662x4096.jpg" //require("@/assets/img/city-profile.jpg")
    },
    img: {
      type: String,
      default: require("@/assets/img/faces/christian.jpg")
    },
    independent: {
        type: Object,
        default: function () {
        return { 
            name: "Sundays Coffee",
            imageUrl: require("@/assets/img/independents/sundays_coffee.jpeg"),
            description: "Portsmouth based independent coffee roaster, roasting responsibly sourced specialty coffee. Originally began roasting at Canvas Coffee when we were closed on a Sunday",
            instagram: "www.instagram.com/sunday_coffee_roasters",
            facebook: null,
            website: "https://sundaycoffee.co.uk/",
            type: "Cafe",
            coverUrl: null,
        }}
    }
    },
    computed: {
      headerStyle() {
        if(this.independent.coverUrl){
            return {
                backgroundImage: `url(${this.independent.coverUrl})`
            }
        }
        return {
            backgroundImage: `url(${this.header})`
        };
      },
    },
}
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

.profile-tabs::v-deep {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  [class*="tab-pane-"] {
    margin-top: 3.213rem;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
}
</style>