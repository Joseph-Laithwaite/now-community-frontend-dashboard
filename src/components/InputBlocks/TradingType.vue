<template>
    <span>
        <label 
        class="md-layout-item md-xsmall-size-100 md-small-size-80 md-medium-size-65 md-large-size-55"
        >
            Which best describes how your business trades?
        </label>
        <br>
        <span class="md-layout-item md-xsmall-size-100 md-small-size-80 md-medium-size-65 md-large-size-55">
            <span>
            <md-radio v-model="businessType" value="maker">
                Maker
            </md-radio>
            <md-tooltip md-direction="bottom">
                Currently making your products and selling online or stocked in local shops
            </md-tooltip>
            </span>
            <span>
            <md-radio v-model="businessType" value="trader">
                Trader
            </md-radio>
            <md-tooltip md-direction="bottom">
                You sell your goods online, through stockists and at pop-up markets.
            </md-tooltip>
            </span>
            <span>
            <md-radio v-model="businessType" value="retailer">
                Retailer
            </md-radio>
            <md-tooltip md-direction="bottom">
                Your business trades at a permanent business address open to the public
            </md-tooltip>
            </span>
            <span>
            <md-radio v-model="businessType" value="supplier">
                Supplier
            </md-radio>
            <md-tooltip md-direction="bottom">
                You sell products directly to businesses with no intention to sell direct to consumer.
            </md-tooltip>
            </span>
        </span>
    </span>
</template>

<script>
export default {
    name:'trading-type',
    data(){
        return{
            businessType:'',
        }
    }
}
</script>