<template>
    <div class="modal-alert-connect">
        <b-modal id="modal-login-metamask" size="sm" @hide="onHide" hide-footer ok-only no-stacking centered>
            <div class="d-block text-center">
                <span class="iconify" data-icon="uit:exclamation-circle" style="color: #D73D24;" data-width="96"
                    data-height="96"></span>
                <p class="mt-4 title-medium">{{ $t('modal-checkout.login-metamask') }}</p>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "modal-profile-claim",
    methods: {
        onHide(evt) {
            if(evt.trigger === "headerclose"){
                this.$root.$emit("alert-login-metamask-gamedetail");
            }
        }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/_variables.scss";
 
</style>
