<template>
    <div class="md-layout">
        <h4 class="md-layout md-alignment-center-left md-layout-item md-small-size-100 md-medium-size-20">
            {{dayLabel}}
        </h4>
        <span v-if="shiftTimes.length>0" class="md-layout-item md-layout md-alignment-center-right">
            <time-span-input 
                v-for="(value,index) in shiftTimes" 
                :key="index" 
                :passedTimeSpan="value" 
                class="md-layout-item md-size-100"
                @delete-span="removeTimeSpan(index)"
            ></time-span-input>
            <md-button 
                @click="addTimeSpan" 
                class="md-dense md-plain md-layout-item md-medium-size-40 md-small-size-40 md-small-size-100"
            >
                <md-icon>more_time</md-icon>
                <label class="small"> Add Extra Shift?</label>
            </md-button>
        </span>
        <span v-else class="md-layout ">
            <span class="md-layout md-alignment-center-left">
                <md-button class="md-dense" @click="addTimeSpan">
                    <md-icon>more_time</md-icon>
                    <label class="small"> Add Shift?</label>
                </md-button>
            </span>
            <h4 class="md-layout md-alignment-center-right">
                CLOSED
            </h4>
        </span>
    </div>
</template>

<script>

import TimeSpanInput from './TimeSpanInput.vue';

export default{
    components: { TimeSpanInput }, 
    name:'day-shit-input',
    props:{
        dayLabel:{default:'Monday'},
        dayId:{default:'monday'},
        initialShifts:{type: Array, required:false},
    },
    data(){
        return{
            shiftTimes:{},
        }
    },
    methods:{
        addTimeSpan(){
            // console.log('Adding new time span');
            this.shiftTimes.push(
                {
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
            );
        },
        removeTimeSpan(index){
            this.shiftTimes.pop(index);
        },
    },
    created(){
        // console.log('Day shift input created initial shifts:');
        // console.log(this.initialShifts);
        if(typeof this.initialShifts !== 'undefined'){
            this.shiftTimes = this.initialShifts;
        }
    },
    watch:{
        initialShifts(initialShifts){
            if(this.initialShifts.length !== 0){
                this.shiftTimes = this.initialShifts;
            }
        }
    }
}
</script>