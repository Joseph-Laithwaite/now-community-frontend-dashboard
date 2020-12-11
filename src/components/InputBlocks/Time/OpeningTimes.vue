<template>
    <div class="md-layout">
        <day-shift-input 
            class="md-layout-item md-size-100"
            v-for="(value,name) in openingTimes" :key="name"
            :dayLabel="name.charAt(0).toUpperCase() + name.slice(1)"
            :dayId="name"
            :initialShifts="value"
        ></day-shift-input>
    </div>
</template>

<script>
import DayShiftInput from './DayShiftInput.vue';


export default{
    components: { DayShiftInput }, 
    name:'opening-times',
    props:{
        initialOpeningTimes:{type:Object}
    },
    data(){
        return{
            openingTimes:{
                monday:[{
                    opening:{
                        hour:'07',
                        minute:'00',
                        period:'AM',
                    },
                    closing:{
                        hour:'10',
                        minute:'00',
                        period:'AM',
                    }},
                    {
                    opening:{
                        hour:'02',
                        minute:'00',
                        period:'PM',
                    },
                    closing:{
                        hour:'06',
                        minute:'00',
                        period:'PM',
                    }}],
                tuesday:[],
                wednesday:[],
                thursday:[],
                friday:[],
                saturday:[],
                sunday:[],
                bankHolidays:[],
            },
        }
    },
    methods:{
        addTimeSpan(day){
            this.openingTimes[day].push(
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
        removeTimeSpan(day, index){
            this.openingTimes[day].pop(index);
            if(this.openingTimes[day].length===0){
                this.isOpen[day]=false;
            }
        },
        toggleOpen(day){
            if(this.isOpen[day]){
                this.addTimeSpan(day);
            }else{
                this.openingTimes[day].splice(0);
            }
        },
    },
    created(){
        // console.log('Opening Times created initial opening times:');
        // console.log(this.initialOpeningTimes);
        if(typeof this.initialOpeningTimes !== 'undefined'){
            this.openingTimes = this.initialOpeningTimes;
        }
    },
    watch:{
        initialOpeningTimes(initialOpeningTimes){
            this.openingTimes=initialOpeningTimes;
        }
    }
}
</script>