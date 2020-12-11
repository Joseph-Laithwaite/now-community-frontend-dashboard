<template>
  <span class="md-layout md-gutter md-alignment-space-between md-layout-item">
    <md-field class="md-layout-item">
      <label>Latitude</label>
      <md-input type="number" v-model="point.lat"></md-input>
    </md-field>
    <md-field class="md-layout-item">
      <label>Longitude</label>
      <md-input type="number" v-model="point.lng"></md-input>
    </md-field>
    <md-button class="md-layout-item" @click="initMap">Set Marker</md-button>
    <br>
    <div id="map"></div>
  </span>
</template>

<script>

import { API_KEY } from "./API_KEY";
import { Loader, LoaderOptions } from "google-maps";

const loader = new Loader(API_KEY);

export default {
  props:{
    pin:{type:Object, 
    // default:function(){return{lat:0, lng:0}}
    }
  },
  data() {
    return {
      nav: null,
      myLatlng: null,
      point:{
        lat:null, 
        lng:null,
      },
      centerMap:{
        lat:50.79574417179238, 
        lng:-1.0767492719388176
      },
      map:null,
    };
  },
  methods:{
    initMap(){
      if(typeof this.point !== 'undefined' && this.point.lat !== null && this.point.lng !== null){
        this.centerMap=this.point;
        // this.point=this.pin;
      }
      this.centerMap.lat=parseFloat(this.centerMap.lat);
      this.centerMap.lng=parseFloat(this.centerMap.lng);
      const center = this.centerMap;
      
      this.point.lat=parseFloat(this.point.lat);
      this.point.lng=parseFloat(this.point.lng);

      const point= this.point;
      // const pointLabel = this.point.label;
      loader.load()
      .then( function(google) {
        // const myPoint = new google.maps.LatLng(point.lat, point.lng);

        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 13,
          center: center,
        });
        const marker = new google.maps.Marker({
          position: point,
          label: point.label,
          map: map,
        });
      });
    },
  },

  mounted() {
    // if(typeof this.pin !== 'undefined' && this.pin.lat !== null && this.pin.lng !== null){
    //   this.centerMap=this.pin;
    //   this.point=this.pin;
    // }
    this.initMap();
    // this.point=this.pin;
      // this.initMap();
  },
  watch:{
    point(point){
      // if(typeof this.pin !== 'undefined' && this.pin.lat !== null && this.pin.lng !== null){
      //   this.centerMap=this.pin;
      //   this.point=this.pin;
      // }
    }
  }
}
</script>
<style>
#map {
  height: calc(60vh - 70px);
  margin-top: 70px;
  width: 100%;
}
</style>
