<template>
  <div class="independent-card">
    <md-card class="md-card-plain">
      <router-link :to="{ name: 'independent', params: { independent } }">
        <div v-if="showImage" class="md-layout-item md-size-50 mx-auto">
          <img
            :src="independent.imageUrl"
            class="img-raised rounded-circle img-fluid"
          />
        </div>
        <h4 v-if="showImage" class="card-title text-center">
          {{ independent.name }}
          <br />
          <small class="card-description text-muted text-center">
            {{ independent.type }}
          </small>
        </h4>
        <h3 v-if="!showImage" class="card-title text-center">
            {{ independent.name }}
            <br />
            <small class="card-description text-muted text-center">
            {{ independent.type }}
            </small>
        </h3>
      </router-link>
      
      <md-card-actions class="text-center">
        <md-button
          v-if="independent.instagram"
          :href="independent.instagram"
          class="md-just-icon md-simple"
          target="_blank"
        >
          <i class="fab fa-instagram"></i>
        </md-button>

        <md-button
          v-if="independent.website"
          :href="independent.website"
          class="md-just-icon md-simple"
          target="_blank"
        >
          <i class="fa fa-desktop"></i>
        </md-button>

        <md-button
          v-if="independent.facebook"
          :href="independent.facebook"
          class="md-just-icon md-simple"
          target="_blank"
        >
          <i class="fab fa-facebook-square"></i>
        </md-button>
      </md-card-actions>

      <md-card-content>
        <router-link :to="{ name: 'independent', params: { independent } }">
          <p class="card-description">
            {{ independent.description }}
          </p>
        </router-link>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "independent-card",
  props: {
    independent: {
      type: Object,
      default: function() {
        return {
          name: "Sundays Coffee",
          imageUrl: require("@/assets/img/independents/sundays_coffee.jpeg"),
          description:
            "Portsmouth based independent coffee roaster, roasting responsibly sourced specialty coffee. Originally began roasting at Canvas Coffee when we were closed on a Sunday",
          instagram: "www.instagram.com/sunday_coffee_roasters",
          facebook: null,
          website: "https://sundaycoffee.co.uk/",
          type: "Cafe"
        };
      }
    },
    showImage: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}
</style>