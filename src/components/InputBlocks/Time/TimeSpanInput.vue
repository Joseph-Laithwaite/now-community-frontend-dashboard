<template>
    <span class="md-layout md-alignment-center-center">
        <time-input 
            class="md-layout-item md-xsmall-size-100 md-small-size-40 md-medium-size-40" 
            :passedTime="timeSpan.opening"
            :timeId='spanId + fromLabel' 
            :timeName='fromLabel'
            @selected-time="setTime('opening')"
        ></time-input>
        <md-icon class="md-layout-item md-xsmall-hide ">arrow_right_alt</md-icon>
        <time-input 
            class="md-layout-item md-xsmall-size-100 md-small-size-40 md-medium-size-40" 
            :passedTime="timeSpan.closing"
            :timeId='spanId + toLabel' 
            :timeName='toLabel'
            @selected-time="setTime('closing')"
        ></time-input>

        <button 
            class="md-button md-icon-button md-plain" 
            :id="spanId + 'close'"  
            v-on:click="$emit('delete-span')">
            <md-icon class="md-layout-item" >close</md-icon>
        </button>
    </span>
</template>

<script>
import TimeInput from './TimeInput.vue';

export default{
    components: { TimeInput }, 
    name:'time-span-input',
    props:{
        returnTimeSpan:{default:false},
        spanId:{default:'shift'},
        fromLabel:{default:'Opening'},
        toLabel:{default:'Closing'},
        passedTimeSpan:{ 
            type: Object, 
            default: function () {
                return {
                    opening:{
                        hour:'09',
                        minute:'00',
                        period:'AM',
                    },
                    closing:{
                        hour:'05',
                        minute:'00',
                        period:'PM',
                    }
                }
            }
        }
    },
    data(){
        return{
            timeSpan:{},
        }
    },
    methods:{
        setTime(type, event){
            this.$set(this.timeSpan, type, event.time);
        }
    },
    created(){
        // console.log("Time Plan Input created Passed time span type: " + typeof this.passedTimeSpan)
        // console.log(this.passedTimeSpan.closing)
        if(typeof this.passedTimeSpan !== 'null'){
            this.timeSpan = this.passedTimeSpan;
        }
    },
    watch:{
        passedTimeSpan(passedTimeSpan){
            // console.log("Time Plan Input Watch on Passed time span type: " + typeof passedTimeSpan)
            if(typeof passedTimeSpan !== 'null'){
                this.timeSpan = passedTimeSpan;
            }
        },
    }
}
</script>