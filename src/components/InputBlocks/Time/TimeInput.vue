<template>
<div class="md-layout">
    <md-field class="md-layout-item md-size-33">
        <label v-text="timeName"></label>
        <md-select v-model="time.hour" :name="timeName+' Hour'" :id="timeId+'Hour'">
            <md-option value="00">00</md-option>
            <md-option value="01">01</md-option>
            <md-option value="02">02</md-option>
            <md-option value="03">03</md-option>
            <md-option value="04">04</md-option>
            <md-option value="05">05</md-option>
            <md-option value="06">06</md-option>
            <md-option value="07">07</md-option>
            <md-option value="08">08</md-option>
            <md-option value="09">09</md-option>
            <md-option value="10">10</md-option>
            <md-option value="11">11</md-option>
            <md-option value="12">12</md-option>
        </md-select>
    </md-field>
    <md-field class="md-layout-item md-size-33">
        <md-select v-model="time.minute" :name="timeName + 'Minute'" :id="timeId + 'Minute'">
            <md-option value="00">00</md-option>
            <md-option value="15">15</md-option>
            <md-option value="30">30</md-option>
            <md-option value="45">45</md-option>
        </md-select>
    </md-field>
    <md-field class="md-layout-item md-size-33">
        <md-select v-model="time.period" :name="timeName + 'Period'" :id="timeId + 'Period'">
            <md-option value="AM">AM</md-option>
            <md-option value="PM">PM</md-option>
        </md-select>
    </md-field>        
</div>
</template>

<script>

export default {
    name:'time-input',
    props:{
        timeName:{
            default: 'Time',
        },
        timeId:{
            default: 'time',
        },
        passedTime:{
            type: Object, 
            default: function () {
                return {
                    hour:'09',
                    minute:'30',
                    period:'AM',
                }
            }
        },
    },
    data(){
        return {
            time:{}
        }
    },
    computed:{
        string12hrTime(){
            return this.time.hour + ':' + this.time.minute + ' ' + this.time.period
        },
        string24hrTime(){
            if(this.time.period==='PM'){
                    return (parseInt(this.time.hour) + 12) + ':' + this.time.minute 
            }
            return this.time.hour + ':' + this.time.minute 
        },

        dateTime(){
              return new Datetime(this.stringTime);
        }
    },
    mounted(){
        if(typeof this.passedTime !== 'null'){
            this.time = this.passedTime;
        }
    },
    watch:{
        passedTimeSpan(passedTime){
            if(typeof passedTime !== 'null'){
                this.time = passedTime;
            }
        }
    }}
</script>